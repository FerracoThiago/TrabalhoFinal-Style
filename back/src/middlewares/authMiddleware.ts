import { NextFunction, Request, Response } from "express";
import auth from "../config/auth";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    const decoded = auth.decodeJWT(token) as any;

    if (!decoded) {
        return res.status(401).json({ message: "Token inválido ou expirado" });
    }

    res.locals.user = { id: decoded.sub.id };
    next();
};