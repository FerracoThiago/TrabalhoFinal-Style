import { NextFunction, Request, Response } from "express";
import { CreateReviewSchema, UpdateReviewSchema } from "../config/validators/reviewValidator";


export const validateCreateReview = (req: Request, res: Response, next: NextFunction) => {
    const result = CreateReviewSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: "Erro de validação", errors: result.error.issues });
    }
    req.body = result.data;
    next();
};

export const validateUpdateReview = (req: Request, res: Response, next: NextFunction) => {
    const result = UpdateReviewSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: "Erro de validação", errors: result.error.issues });
    }
    req.body = result.data;
    next();
};