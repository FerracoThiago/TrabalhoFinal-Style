import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export class VariantController {

    public static async createVariant(req: Request, res: Response) {
        /*Auth token middleware */
        /*Field validator middleware */
        try {
            const { size, color, stock, productId } = req.body;

            const product = await prisma.product.findUnique({ where: { id: productId } });
            if (!product) {
                return res.status(404).json({ message: "produto não encontrado" });
            }

            const variant = await prisma.variant.create({
                data: { size, color, stock, productId }
            });

            return res.status(201).json(variant);
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    //  pega apenas uma variante pelo id
    public static async readVariant(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const variant = await prisma.variant.findUnique({ where: { id: Number(id) } });
            if (!variant) {
                return res.status(404).json({ message: "variante não encontrada" });
            }
            return res.status(200).json(variant);
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    // pega todas as variantes de um produto específico
    public static async readVariantsByProduct(req: Request, res: Response) {
        try {
            const { productId } = req.params;
            const variants = await prisma.variant.findMany({ where: { productId: Number(productId) } });
            return res.status(200).json(variants);
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async updateVariant(req: Request, res: Response) {
        /*Auth token middleware */
        /*Field validator middleware */
        try {
            const { id } = req.params;
            const foundVariant = await prisma.variant.findUnique({ where: { id: Number(id) } });
            if (!foundVariant) {
                return res.status(404).json({ message: "variante não encontrada" });
            }

            const { size, color, stock } = req.body;
            const updated = await prisma.variant.update({
                data: { size, color, stock },
                where: { id: Number(id) }
            });

            return res.status(200).json({ message: "variante atualizada!", id: updated.id });
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }

    public static async deleteVariant(req: Request, res: Response) {
        /*Auth token middleware */
        try {
            const { id } = req.params;
            const deleted = await prisma.variant.delete({ where: { id: Number(id) } });
            return res.status(200).json({ message: "variante deletada com sucesso!", id: deleted.id });
        } catch (e: any) {
            return res.status(500).json({ message: e.message });
        }
    }
}