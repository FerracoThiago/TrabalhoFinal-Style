import { Request, Response } from "express";
import { prisma } from "../config/prisma";


export class ReviewController{
    /*CRUD Review */

    public static async createReview(req:Request,res:Response){
        /*validate token Middleware */
        /*get userId by token Middleware */
        try {
            const userId = Number(res.locals.user.id);
            const { rating, productId } = req.body;
            const foundProduct = await prisma.product.findUnique({where:{id:productId}});
            if(!foundProduct)
                return res.status(404).json({message:"Produto não encontrado!"});

            const createReview = await prisma.review.create({
                data:{
                    userId,
                    rating,
                    productId
                }
            });
            return res.status(201).json({message:"Review cadastrada com sucesso!",createReview});


        } catch (e:any) {
            return res.status(500).json({message:e.message});
        }
    }

    public static async readReview(req:Request,res:Response){
        //informação pública, não necessita autenticar usuario
        try {
            const reviewId = Number(req.params.reviewId);
            const foundReview = await prisma.review.findUnique({where:{id:reviewId}});
            if(!foundReview)
                res.status(404).json({message:"Avaliação não encontrada"});
            
            return res.status(200).json({foundReview});

        } catch (e:any) {
            return res.status(500).json({message:e.message});
        }
    }

        public static async readAllReviews(req:Request,res:Response){
        //informação pública, não necessita autenticar usuario
        try {
            
            const foundReviews = await prisma.review.findMany();
            if(!foundReviews)
                res.status(404).json({message:"Avaliações não encontradas"});
            
            return res.status(200).json({foundReviews});

        } catch (e:any) {
            return res.status(500).json({message:e.message});
        }
    }

    public static async readAllReviewsFromProduct(req:Request,res:Response){
    //informação pública, não necessita autenticar usuario
    try {
        const productId = Number(req.params.productId);
        const foundReviews = await prisma.review.findMany({where:{productId:productId}});
        if(!foundReviews)
            res.status(404).json({message:"Produto não existe ou não tem avaliações"});
        
        return res.status(200).json({foundReviews});

    } catch (e:any) {
        return res.status(500).json({message:e.message});
    }
}

    public static async updateReview(req:Request,res:Response){
        /*Auth token middleware */
        /*get user Id by token middleware*/
        try {
            const userId = Number(res.locals.user.id);
            const {reviewId, rating} = req.body; //decidi não permitir editar userId e productId, não faz sentido para negocios

            const foundReview = await prisma.review.findUnique({where:{id:reviewId, userId:userId}});
            if(!foundReview)
                return res.status(404).json({message:"Avaliação não encontrada!"});

            const updatedReview = await prisma.review.update({
                data:{rating},
                where:{id:reviewId}
            });
            return res.status(200).json({updatedReview});
        } catch (e:any) {
            return res.status(500).json({message:e.message});
        }
    }

    public static async deleteReview(req:Request,res:Response){
        /*Auth token middleware */
        /*Get userID by token middleware */
        //Apenas o usuario pode apagar suas reviews
        try {
            const userId = Number(res.locals.user.id);
            const reviewId = Number(req.params.reviewId);

            const deletedReview = await prisma.review.delete({where:{id:reviewId,userId:userId}});
            return res.status(200).json({deletedReview});

        } catch (e:any) {
            return res.status(500).json({message:e.message});
        }
    }
}