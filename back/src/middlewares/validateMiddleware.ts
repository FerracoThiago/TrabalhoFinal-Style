import { Request, Response, NextFunction } from "express";
import { RegisterSchema } from "../config/validators/authValidator";

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