import { Request, Response, NextFunction } from "express";
import { RegisterSchema } from "../config/validators/authValidator";
import { CreateVariantSchema, UpdateVariantSchema } from "../config/validators/variantValidator";

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    const result = RegisterSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Erro de validação",
            errors: result.error.issues
        });
    }

    req.body = result.data;
    next();
};

export const validateCreateVariant = (req: Request, res: Response, next: NextFunction) => {
    const result = CreateVariantSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: "Erro de validação", errors: result.error.issues });
    }
    req.body = result.data;
    next();
};

export const validateUpdateVariant = (req: Request, res: Response, next: NextFunction) => {
    const result = UpdateVariantSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: "Erro de validação", errors: result.error.issues });
    }
    req.body = result.data;
    next();
};