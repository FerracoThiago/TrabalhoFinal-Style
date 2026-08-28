import { z } from 'zod';

export const CreateReviewSchema = z.object({

    rating: z.number().int().max(5, "nota máxima pro produto é 5").min(0, "nota mínima pro produto é 0"),
    
    productId: z.number().int().min(1,"id de produto obrigatorio"),
});

export const UpdateReviewSchema = CreateReviewSchema.partial().extend({reviewId: z.int().min(1,"identificador de review obrigatório")});
