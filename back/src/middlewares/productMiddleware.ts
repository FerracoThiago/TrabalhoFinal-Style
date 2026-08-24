import { Request, Response, NextFunction } from "express";
import { CreateProductSchema, UpdateProductSchema } from "../config/validators/productValidator";

export const validateCreateProduct = (req: Request, res: Response, next: NextFunction) => {
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