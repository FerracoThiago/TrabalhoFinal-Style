import { Request, Response } from "express";
import auth from "../config/auth";
import { prisma } from "../config/prisma";


/* CRUD User */

export class UserController {

    public static async createUser(req: Request, res: Response){
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
}
