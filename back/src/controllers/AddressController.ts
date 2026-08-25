import { Request, Response } from "express";
import auth from '../config/auth';
import { Mailer } from '../config/mail';
import { prisma } from '../config/prisma';

export class AddressController {
    public static async createAddress(req: Request, res: Response) {
        try {
            const userId = Number(res.locals.user.id);
            const {street, city, state, zipCode, type} = req.body;

            const address = await prisma.address.create({
                data: {
                    street,
                    city,
                    state,
                    zipCode,
                    type,
                    user: {
                        connect: {id: userId}
                    }
                }
            });
            return res.status(201).json(address);

        } catch (e: any) {
            return res.status(500).json({message: e.message});
        }
    }

    public static async readAddresses(req: Request, res: Response) {
        try {
            const userId = Number(res.locals.user.id);
            const addresses = await prisma.address.findMany({
                where: {
                    userId: userId
                }
            });

            return res.status(200).json(addresses);
        } catch (e: any) {
            return res.status(500).json({message: e.message});
        }
    }

    public static async updateAddress(req: Request, res: Response) {
        try {
            const userId = Number(res.locals.user.id);
            const addressId = Number(req.params.id);
            const {street, city, state, zipCode, type} = req.body;
            const address = await prisma.address.findUnique({
                where: {
                    id: addressId
                }
            });
            if (!address) {
                return res.status(404).json({message: "Endereço não encontrado"});
            }
            if (address.userId !== userId) {
                return res.status(403).json({message: "Erro de autenticação"});
            }

            const updatedAddress = await prisma.address.update({
                where: {
                    id: addressId
                },
                data: {
                    street,
                    city,
                    state,
                    zipCode,
                    type
                }
            });
            return res.status(200).json(updatedAddress);
        } catch (e: any) {
            return res.status(500).json({message: e.message});
        }
    }

    public static async deleteAddress(req: Request, res: Response) {
        try {
            const userId = Number(res.locals.user.id);
            const addressId = Number(req.params.id);
            const address = await prisma.address.findUnique({
                where: {
                    id: addressId
                }
            });
            if (!address) {
                return res.status(404).json({message: "Endereço não encontrado"});
            }
            if (address.userId !== userId) {
                return res.status(403).json({message: "Erro de autenticação"});
            }

            await prisma.address.delete({
                where: {
                    id: addressId
                }
            });
            return res.status(200).json({message: "Endereço deletado com sucesso"});
        } catch (e: any) {
            return res.status(500).json({message: e.message});
        }
    }
}