import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export class CouponController {

    /*CRUD Cupom*/
    public static async createCoupon(req:Request, res:Response){
        try {
            /*possibilidade de autenticação de gestor para utilizar metodo*/
            const { usageLimit, validate, discountMax, code, discount } = req.body;
            const createdCoupon = await prisma.cupom.create({data:{
                    usageLimit,
                    validate: new Date(validate),
                    discountMax,
                    code,
                    discount
                }
            });
            

            return res.status(201).json({createdCoupon});
        } catch (e:any) {
            return res.status(500).json({message:e.message});
        }
    }

    public static async readCoupon(req:Request, res:Response){
        try {
            const couponId = Number(req.params);
            const foundCoupon = await prisma.cupom.findUnique({where:{id:couponId}});
            if(!foundCoupon)
                return res.status(404).json({message: "cupom expirado ou não existe!"});
            return res.status(200).json({message:"cupom encontrado com sucesso!", foundCoupon})
        } catch (e:any) {
            return res.status(500).json({message:e.message});
        }
    }

    public static async updateCoupon(req:Request,res:Response){
        try {
            const {couponId, usageLimit, validate, discountMax, code, discount } = req.body;
            const foundCoupon = await prisma.cupom.findUnique({where:{id:couponId}});
            if(!foundCoupon)
                return res.status(404).json({message: "cupom expirado ou não existe!"});
            
            const updatedCoupon: any = {
                usageLimit,
                discountMax,
                code,
                discount
            }
            if(validate)
                updatedCoupon.validate = new Date(validate);
            
            await prisma.cupom.update({
                data:updatedCoupon,
                where:{id:foundCoupon.id}
            });
            return res.status(200).json({message:"cupom atualizado!", updatedCoupon})
        } catch (e:any) {
            return res.status(500).json({message:e.message});
        }
    }
    public static async sendCouponToUser(req:Request,res:Response){
        try {
            /*auth middleware*/
            /*get userId by token middleware*/
            const userId = Number(res.locals.user.id);
            const {couponId} = req.body;
            const foundCoupon = await prisma.cupom.findUnique({where:{id:couponId}});
            if(!foundCoupon)
                return res.status(404).json({message: "cupom expirado ou não existe!"});
            
            const assignedCoupon = await prisma.cupom.update({
                data:{users:{ connect:{id:userId}}},
                where:{id:foundCoupon.id}
            });
            return res.status(200).json({message:"Usuario recebeu o cupom!"})
        } catch (e:any) {
            return res.status(500).json({message:e.message});
        }
    }

}