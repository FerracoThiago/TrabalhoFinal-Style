import { Request, Response } from "express";
import auth from '../config/auth';
import { Mailer } from '../config/mail';
import { prisma } from '../config/prisma';

export class AuthController {
    public static async register(request: Request, response: Response) {
        try {
            const { firstName, lastName, email, gender, password, notifications } = request.body;

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
                    gender,
                    hash,
                    salt,
                    notifications: false,
                    cart: {
                        create: {
                            total: 0,
                            subtotal: 0,
                            savings: 0,
                            shipping: 0
                        }
                    }
                },
                include: { cart: true }
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

            const token = auth.generateJWT(String(user.id));
            const { hash: _, salt: __, ...userWithoutSensitive } = user;

            Mailer.sendEmail(
                user.email,
                "Login realizado com sucesso",
                `Olá ${user.firstName}, você realizou login em sua conta. Se não foi você, por favor, entre em contato conosco imediatamente.`
            );

            response.json({ token, user: userWithoutSensitive });
        } catch (error: any) {
            response.status(500).json({ message: error.message });
        }
    }
}