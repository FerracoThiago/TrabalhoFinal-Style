import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export class WishlistController {
    public static async createWishlist(req: Request, res: Response) {
        try {
            const userId = Number(res.locals.user.id);

            const existingWishlist = await prisma.wishlist.findUnique({
                where: { userId }
            });

            if (existingWishlist) {
                return res.status(409).json({ message: "Usuário já possui uma wishlist" });
            }

            const wishlist = await prisma.wishlist.create({
                data: {
                    userId,
                    items: {
                        connect: []
                    }
                }
            });

            return res.status(201).json(wishlist);
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async readWishlist(req: Request, res: Response) {
        try {
            const userId = Number(res.locals.user.id);

            const wishlist = await prisma.wishlist.findUnique({
                where: { userId },
                include: { items: true }
            });

            if (!wishlist) {
                return res.status(404).json({ message: "Wishlist não encontrada" });
            }

            return res.status(200).json(wishlist);
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async addItem(req: Request, res: Response) {
        try {
            const userId = Number(res.locals.user.id);
            const { productId } = req.body;

            const wishlist = await prisma.wishlist.findUnique({
                where: { userId },
                include: { items: true }
            });

            if (!wishlist) {
                return res.status(404).json({ message: "Wishlist não encontrada" });
            }

            const existingItem = wishlist.items.find(
                (item) => item.id === productId
            );

            if (existingItem) {
                return res.status(409).json({ message: "Produto já está na wishlist" });
            }

            const updatedWishlist = await prisma.wishlist.update({
                where: { id: wishlist.id },
                data: {
                    items: {
                        connect: { id: productId }
                    }
                },
                include: { items: true }
            });

            return res.status(200).json(updatedWishlist);
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async deleteItem(req: Request, res: Response) {
        try {
            const userId = Number(res.locals.user.id);
            const { productId } = req.body;

            const wishlist = await prisma.wishlist.findUnique({
                where: { userId }
            });

            if (!wishlist) {
                return res.status(404).json({ message: "Wishlist não encontrada" });
            }

            const updatedWishlist = await prisma.wishlist.update({
                where: { id: wishlist.id },
                data: {
                    items: {
                        disconnect: { id: productId }
                    }
                },
                include: { items: true }
            });

            return res.status(200).json(updatedWishlist);
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async deleteWishlist(req: Request, res: Response) {
        try {
            const userId = Number(res.locals.user.id);

            const wishlist = await prisma.wishlist.findUnique({
                where: { userId }
            });

            if (!wishlist) {
                return res.status(404).json({ message: "Wishlist não encontrada" });
            }

            await prisma.wishlist.delete({
                where: { userId }
            });

            return res.status(200).json({ message: "Wishlist deletada com sucesso" });
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }
}