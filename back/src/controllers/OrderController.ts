import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export class OrderController {
    public static async createOrder(req: Request, res: Response) {
        try {
            const userId = Number(res.locals.user.id);
            const { status, total, paymentMethod, items } = req.body;

            const order = await prisma.order.create({
                data: {
                    status,
                    total,
                    paymentMethod,
                    user: {
                        connect: { id: userId }
                    },
                    items: {
                        create: items.map((item: any) => ({
                            quantity: item.quantity,
                            product: {
                                connect: { id: item.productId }
                            }
                        }))
                    }
                }
            });

            return res.status(201).json(order);
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async readOrder(req: Request, res: Response) {
        try {
            const orderId = Number(req.params.id);
            const foundOrder = await prisma.order.findUnique({
                where: { id: orderId },
                include: { user: true, items: { include: { product: true } } }
            });
            return res.status(200).json(foundOrder);
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async readAllOrders(req: Request, res: Response) {
        try {
            const orders = await prisma.order.findMany({
                include: { user: true, items: { include: { product: true } } }
            });
            return res.status(200).json(orders);
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async updateOrder(req: Request, res: Response) {
        try {
            const orderId = Number(req.params.id);
            const { status, total, paymentMethod } = req.body;
            const updatedOrder = await prisma.order.update({
                where: { id: orderId },
                data: {
                    status,
                    total,
                    paymentMethod
                }
            });
            return res.status(200).json(updatedOrder);
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async deleteOrder(req: Request, res: Response) {
        try {
            const orderId = Number(req.params.id);
            await prisma.order.delete({
                where: { id: orderId }
            });
            return res.status(200).json({ message: "Pedido deletado com sucesso" });
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }
}