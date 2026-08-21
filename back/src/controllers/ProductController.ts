import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export class ProductController {

    public static async createProduct(req: Request, res: Response) {
        try {
            const photo = req.file;
            const { name, description, price, specification, tags, category, inStock, variants } = req.body;

            const createdProduct = await prisma.product.create({
                data: {
                    name,
                    description,
                    price,
                    specification,
                    tags,
                    category,
                    inStock,
                    variants: {
                        create: {
                            size: variants.size,
                            color: variants.color,
                            stock: variants.stock,
                        }
                    },
                    profPicFile: photo ? photo.path : null,
                },
                include: { variants: true }
            });

            return res.status(201).json(createdProduct);
        }
        catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async readProduct(req: Request, res: Response) {
        try {
            const productId = Number(req.params.id);
            const foundProduct = await prisma.product.findUnique({ where: { id: productId } });

            if (!foundProduct) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }
            return res.status(200).json(foundProduct);
        }
        catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async readAllProducts(req: Request, res: Response) {
        try {
            const products = await prisma.product.findMany();
            return res.status(200).json(products);
        }
        catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async updateProduct(req: Request, res: Response) {
        try {
            const productId = Number(req.params.id);
            const { name, description, price, specification, tags, category, inStock } = req.body;

            await prisma.product.update({
                where: { id: productId },
                data: {
                    name,
                    description,
                    price,
                    specification,
                    tags,
                    category,
                    inStock
                }
            });
            return res.status(200).json({ message: "Produto atualizado com sucesso" });
        }
        catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async deleteProduct(req: Request, res: Response) {
        try {
            const productId = Number(req.params.id);
            await prisma.product.delete({ where: { id: productId } });
            return res.status(200).json({ message: "Produto deletado com sucesso" });
        }
        catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }
}