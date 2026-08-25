import { z } from 'zod';

export const CreateVariantSchema = z.object({
    size: z.string().optional(),
    color: z.string().optional(),
    stock: z.number().int().nonnegative("Estoque não pode ser negativo"),
    productId: z.number().int().positive("productId inválido"),
});

export const UpdateVariantSchema = CreateVariantSchema.omit({ productId: true }).partial();