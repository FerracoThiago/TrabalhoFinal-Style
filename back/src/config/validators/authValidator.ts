import { z } from 'zod';

export const RegisterSchema = z.object({
    firstName: z.string().min(1, "Nome é obrigatório"),
    lastName: z.string().min(1, "Sobrenome é obrigatório"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(10, "Telefone deve ter pelo menos 10 caracteres"),
    birthday: z.string().min(1, "Data de nascimento é obrigatória"),
    gender: z.string().optional(),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});