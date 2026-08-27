import { z } from 'zod';

export const CreateProductSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    price: z.coerce.number().min(0, "Preço deve ser maior ou igual a 0"),
    specification: z.string().min(1, "Especificação é obrigatória"),
    tags: z.preprocess((val) => {
        if (typeof val === "string") {
            return JSON.parse(val);
        }
        return val;
    }, z.array(z.string())),
    category: z.string().min(1, "Categoria é obrigatória"),
    inStock: z.coerce.boolean(),
    variants: z.preprocess((val) => {
        if (typeof val === "string") {
            return JSON.parse(val);
        }
        return val;
    }, z.array(
        z.object({
            size: z.string().optional(),
            color: z.string().optional(),
            stock: z.coerce.number().int().positive(),
        })
    )),
});

export const UpdateProductSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    price: z.number().min(0).optional(),
    discount: z.number().min(0).max(100).optional(),
    avgReview: z.number().min(0).max(5).optional(),
    specification: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    inStock: z.boolean().optional(),
    variants: z.array( // validação para variantes opcionais
        z.object({
            size: z.string().optional(),
            color: z.string().optional(),
            stock: z.number().int().positive().optional(),
        })
    ).optional(),
});