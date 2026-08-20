import { Request, Response } from "express";
import auth from "../config/auth";
import { prisma } from "../config/prisma";


/* CRUD User */

export class UserController {

    public static async readUser(req:Request, res: Response){
        /*Auth token middleware */
        /*Identify user by token middleware */
        try {
            const userId = res.locals.user.id;      /*recebido da identify token middleware*/
            const foundUser = await prisma.user.findUnique({where:{id:userId}});
            if(!foundUser){
                return res.status(404).json({message: "usuario não encontrado"})
            }
            return res.status(200).json({
                id:foundUser.id,
                fistName: foundUser.firstName,
                lastName: foundUser.lastName,
                email: foundUser.email,
                phone: foundUser.phone,
                birthday: foundUser.birthday,
                gender: foundUser.gender

            });

        } catch (e:any) {
            return res.status(500).json({message:e.message});
        }
    }

    public static async readAllUsers(req:Request,res:Response){
        try {
            const allUsers = await prisma.user.findMany();
            if(!allUsers){
                return res.status(404).json({message: "usuario não encontrado"});   
            }
            return res.status(200).json({allUsers});

        } catch (e:any) {
            return res.status(500).json({message:e.message});
        }
    }

    public static async updateUser(req:Request,res:Response){
        /*Auth token middleware */
        /*Identify user by token middleware */
        /*Field validator middleware */
        try {
            const userId = res.locals.user.id;      //via mittleware de identificação do id pelo token
            const foundUser = await prisma.user.findUnique({where:{id:userId}});
            if(!foundUser){
                return res.status(404).json({message:"usuario não encontrado"});
            }
            const {firstName,lastName,email,phone, birthday, gender, password, notifications} = req.body;
            const updatedUser: any = {
                firstName,
                lastName,
                email,
                phone,
                gender,
                notifications
                };

            if (birthday) {
                updatedUser.birthday = new Date(birthday);
            }
            if (password) {
                const { salt, hash } = auth.generatePassword(password);
                updatedUser.hash = hash;
                updatedUser.salt = salt;
            }
            const updated = await prisma.user.update({
                data:updatedUser,
                where:{id:userId}
            });
            return res.status(200).json({message: "informações do usuario atualizadas!", id: updated.id});

        } catch (e:any) {
            return res.status(500).json({message:e.message});
        }
    }

    public static async deleteUser(req:Request,res:Response){
        /*Auth token middleware*/
        /*Get user id by token middleware */
        try {
            const userId = res.locals.user.id;
            const deletedUser = await prisma.user.delete({where:{id:userId}});
            if(!deletedUser){
                return res.status(404).json({message:"usuario nao encontrado"});
            }
            return res.status(200).json({message: "Usuario deletado com sucesso!", id: deletedUser.id});
        } catch (e:any) {
            return res.status(500).json({message:e.message});
        }
    }

    public static async setProfPicUser(req:Request,res:Response){
        try {

            const userId = res.locals.user.id;
            if(!req.file){
                return  res.status(404).json({message:"imagem não encontrada"})
            }
            const profPicName = req.file.filename;
            await prisma.user.update({
                data:{profPicPath:profPicName},
                where:{id:userId}
            });
            return res.status(200).json({message: "foto de perfil cadastrada com sucesso!"});

        } catch (e:any) {
            return res.status(500).json({message:e.message});
        }

    }
    

}

