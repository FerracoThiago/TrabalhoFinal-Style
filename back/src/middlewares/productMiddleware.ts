import { Request, Response, NextFunction } from "express";
import { CreateProductSchema, UpdateProductSchema } from "../config/validators/productValidator";

export const validateCreateProduct = (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body.tags === "string") {
        try {
            req.body.tags = JSON.parse(req.body.tags);
        } catch {
            req.body.tags = [req.body.tags]; // se não for JSON, cria um array com a string
        }
    }
    if (typeof req.body.variants === "string") {
        try {
            req.body.variants = JSON.parse(req.body.variants);
        } catch {
            req.body.variants = [req.body.variants]; // se não for JSON, cria um array com a string
        }
    }
    

    const result = CreateProductSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Erro de validação",
            errors: result.error.issues
        });
    }

    req.body = result.data;
    next();
};

export const validateUpdateProduct = (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body.tags === "string") {
        req.body.tags = JSON.parse(req.body.tags);
    }
    if (typeof req.body.variants === "string") {
        req.body.variants = JSON.parse(req.body.variants);
    }

    const result = UpdateProductSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Erro de validação",
            errors: result.error.issues
        });
    }

    req.body = result.data;
    next();
};