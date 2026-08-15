import { Request, Response } from "express";
import auth from "../config/auth";
import { prisma } from "../config/prisma";


/* CRUD User */

export class UserController {

    public static async createUser(req: Request, res: Response){
        /*Field Validator middleware (zod)*/ 

        try{
        const {firstName, lastName, email, phone, birthday, gender, password} = req.body;
        const {salt,hash} = auth.generatePassword(password);
        const createdUser = await prisma.user.create({
            data:{
                firstName,
                lastName,
                email,
                phone,
                birthday,    //birthday: new Date(birthday) quando alterar a model
                gender,
                hash,
                salt,
                notifications: 0
            }
            });
            return res.status(201).json({message: "Usuario criado com sucesso!",id: createdUser.id});

        }

        catch(e: any){
            return res.status(500).json({message: e.message});
        }

    }

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
            const {salt,hash} = auth.generatePassword(password);
            const updatedUser = await prisma.user.update({
                data:{
                    firstName,
                    lastName,
                    email,
                    phone,
                    birthday,
                    gender,
                    hash,
                    salt,
                    notifications

                },where:{id:userId}
            });
            return res.status(200).json({message: "informações do usuario atualizadas!", id: userId});

        } catch (e:any) {
            return res.status(500).json({message:e.message});
        }
    }
}
