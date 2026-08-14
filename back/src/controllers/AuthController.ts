import { prisma } from '../config/prisma';
import { Request, Response } from "express";
import auth from '../config/auth';
import { RegisterSchema } from '../config/validators/authValidator';

export class AuthController {
    public static async register(request: Request, response: Response) {
        try {
            const result = RegisterSchema.safeParse(request.body);

            if (!result.success) {
                return response.status(400).json({
                    message: "Erro de validação",
                    errors: result.error.issues
                });
            }

            const { firstName, lastName, email, phone, birthday, gender, password } = request.body;
            const existingUser = await prisma.user.findUnique({
                where: { email }
            });

            if (existingUser) {
                return response.status(409).json({ message: "Email já cadastrado" });
            }

            const { salt, hash } = auth.generatePassword(password);

            const user = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    phone,
                    birthday,
                    gender,
                    hash,
                    salt
                }
            });

            const { hash: _, salt: __, ...userWithoutSensitive } = user;
            response.status(201).json(userWithoutSensitive);

        } catch (error: any) {
            response.status(500).json({ message: error.message });
        }
    }

    public static async login(request: Request, response: Response) {
        try {
            const { email, password } = request.body;

            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                return response.status(401).json({ message: "Credenciais inválidas" });
            }
            const isValid = auth.checkPassword(password, user.hash, user.salt);

            if (!isValid) {
                return response.status(401).json({ message: "Credenciais inválidas" });
            }

            const token = auth.generateJWT(user.id);
            const { hash: _, salt: __, ...userWithoutSensitive } = user;

            response.json({ token, user: userWithoutSensitive });
        } catch (error: any) {
            response.status(500).json({ message: error.message });
        }
    }

    public static async me(request: Request, response: Response) {
        try {
            const userId = (request as any).userId;

            const user = await prisma.user.findUnique({
                where: { id: userId }
            });

            if (!user) {
                return response.status(404).json({ message: "Usuário não encontrado" });
            }

            const { hash: _, salt: __, ...userWithoutSensitive } = user;
            response.json(userWithoutSensitive);
        } catch (error: any) {
            response.status(500).json({ message: error.message });
        }
    }
}