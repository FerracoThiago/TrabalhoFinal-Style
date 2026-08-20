import { prisma } from '../config/prisma';
import { Request, Response } from "express";

export class CartController {
    private static async updateNotification(userId: number, cart: any) {
        const totalItems = cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0);

        await prisma.user.update({
            where: { id: userId },
            data: { notifications: totalItems > 0 }
        });
    }

    public static async createCart(req: Request, res: Response) {
        try {
            const userId = res.locals.user.id;

            const existingCart = await prisma.cart.findUnique({
                where: { userId }
            });

            if (existingCart) {
                return res.status(409).json({ message: "Usuário já possui um carrinho" });
            }

            const cart = await prisma.cart.create({
                data: {
                    userId,
                    total: 0,
                    subtotal: 0,
                    savings: 0,
                    shipping: 0
                }
            });

            res.status(201).json(cart);
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    }

    public static async readCart(req: Request, res: Response) {
        try {
            const userId = res.locals.user.id;

            const cart = await prisma.cart.findUnique({
                where: { userId },
                include: {
                    items: {
                        include: {
                            product: true
                        }
                    }
                }
            });

            if (!cart) {
                return res.status(404).json({ message: "Carrinho não encontrado" });
            }

            res.json(cart);
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    }

    public static async updateCart(req: Request, res: Response) {
        try {
            const userId = res.locals.user.id;
            const { productId, quantity, operation } = req.body;
            const qty = quantity || 1;
            const op = operation || "add";

            let cart = await prisma.cart.findUnique({
                where: { userId },
                include: { items: true }
            });

            if (!cart) {
                return res.status(404).json({ message: "Carrinho não encontrado" });
            }

            const existingItem = cart.items.find(
                (item: any) => item.productId === productId
            );

            if (op === "add") {
                if (existingItem) {
                    await prisma.cartProduct.update({
                        where: {
                            cartId_productId: {
                                cartId: cart.id,
                                productId
                            }
                        },
                        data: { quantity: existingItem.quantity + qty }
                    });
                } else {
                    await prisma.cartProduct.create({
                        data: {
                            cartId: cart.id,
                            productId,
                            quantity: qty
                        }
                    });
                }
            } else if (op === "remove") {
                if (!existingItem) {
                    return res.status(404).json({ message: "Item não encontrado no carrinho" });
                }

                const newQuantity = existingItem.quantity - qty;

                if (newQuantity <= 0) {
                    await prisma.cartProduct.delete({
                        where: {
                            cartId_productId: {
                                cartId: cart.id,
                                productId
                            }
                        }
                    });
                } else {
                    await prisma.cartProduct.update({
                        where: {
                            cartId_productId: {
                                cartId: cart.id,
                                productId
                            }
                        },
                        data: { quantity: newQuantity }
                    });
                }
            } else {
                return res.status(400).json({ message: "Operação inválida. Use 'add' ou 'remove'" });
            }

            const updatedCart = await prisma.cart.findUnique({
                where: { userId },
                include: { items: true }
            });

            await this.updateNotification(userId, updatedCart);

            const cartWithProducts = await prisma.cart.findUnique({
                where: { userId },
                include: { items: { include: { product: true } } }
            });

            res.status(200).json(cartWithProducts);
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    }

    public static async deleteAllItemsInCart(req: Request, res: Response) {
        try {
            const userId = res.locals.user.id;

            const cart = await prisma.cart.findUnique({
                where: { userId }
            });

            if (!cart) {
                return res.status(404).json({ message: "Carrinho não encontrado" });
            }

            await prisma.cartProduct.deleteMany({
                where: { cartId: cart.id }
            });

            const updatedCart = await prisma.cart.findUnique({
                where: { userId },
                include: { items: true }
            });

            await this.updateNotification(userId, updatedCart);

            res.status(200).json({ message: "Carrinho esvaziado" });
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    }
}