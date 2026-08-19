import { prisma } from '../config/prisma';
import { Request, Response } from "express";

export class CartController {
    public static async createCart(req: Request, res: Response) {
        try {
            const userId = res.locals.user.id;

            const existingCart = await prisma.cart.findUnique({
                where: { userId }
            });

            if (!existingCart) {
                return res.status(409).json({ message: "Usuário já possui um carrinho" });
            }

            const cart = await prisma.cart.create({
                data: { userId }
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
                include: { items: { include: { product: true } } }
            });

            if (!cart) {
                return res.status(404).json({ message: "Carrinho não encontrado" });
            }

            res.json(cart);
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    }

    // adiciona item ao carrinho, se já existir incrementa a quantidade
    public static async updateCart(req: Request, res: Response) {
        try {
            const userId = res.locals.user.id;
            const { productId, quantity } = req.body;
            const qty = quantity || 1;

            let cart = await prisma.cart.findUnique({ where: { userId } });

            if (!cart) {
                return res.status(404).json({ message: "Carrinho não encontrado" });
            }

            const existingItem = await prisma.cartItem.findFirst({
                where: { cartId: cart.id, productId }
            });

            if (existingItem) {
                await prisma.cartItem.update({
                    where: { id: existingItem.id },
                    data: { quantity: existingItem.quantity + qty }
                });
            } else {
                await prisma.cartItem.create({
                    data: { cartId: cart.id, productId, quantity: qty }
                });
            }

            const updatedCart = await prisma.cart.findUnique({
                where: { userId },
                include: { items: { include: { product: true } } }
            });

            res.status(200).json(updatedCart);
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    }

    //deleta todos os itens do carrinho
    public static async deleteAllItemsInCart(req: Request, res: Response) {
        try {
            const userId = res.locals.user.id;

            const cart = await prisma.cart.findUnique({ where: { userId } });

            if (!cart) {
                return res.status(404).json({ message: "Carrinho não encontrado" });
            }

            await prisma.cartItem.deleteMany({
                where: { cartId: cart.id }
            });

            res.status(200).json({ message: "Carrinho esvaziado" });
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    }

    //decrementa item até 0
    public static async deleteCartItem(req: Request, res: Response) {
        try {
            const userId = res.locals.user.id;
            const itemId = Number(req.params.id);

            const cart = await prisma.cart.findUnique({ where: { userId } });

            if (!cart) {
                return res.status(404).json({ message: "Carrinho não encontrado" });
            }

            const item = await prisma.cartItem.findUnique({
                where: { id: itemId }
            });

            if (!item) {
                return res.status(404).json({ message: "Item não encontrado no carrinho" });
            }

            if (item.cartId !== cart.id) {
                return res.status(403).json({ message: "Item não pertence ao seu carrinho" });
            }

            const newQuantity = item.quantity - 1;

            if (newQuantity <= 0) {
                await prisma.cartItem.delete({
                    where: { id: itemId }
                });
            } else {
                await prisma.cartItem.update({
                    where: { id: itemId },
                    data: { quantity: newQuantity }
                });
            }

            const updatedCart = await prisma.cart.findUnique({
                where: { userId },
                include: { items: { include: { product: true } } }
            });

            res.status(200).json(updatedCart);
        } catch (e: any) {
            res.status(500).json({ message: e.message });
        }
    }

}