import { fakerPT_BR } from "@faker-js/faker";
import { prisma } from "../../../config/prisma";
import { CupomCreateInput } from "../../../generated/prisma/models";

export async function couponSeeder(couponQt: number) {
    //parametrizei gerar cupons com no max 75% de desconto que atingem um maximo de 500 de desconto
    let coupons: CupomCreateInput[] = [];
    for (let i = 0; i < couponQt; i++) {
        let coupon: CupomCreateInput = {
            code: fakerPT_BR.word.adjective({length:{min:2,max:10},strategy:"closest"}).toUpperCase(),
            usageLimit : fakerPT_BR.number.int({min:1,max:10000}),
            validate : fakerPT_BR.date.soon({days:{min:2,max:30}}),
            discountMax : +fakerPT_BR.number.float({min:10,max:500}).toFixed(2),
            discount : +fakerPT_BR.number.float({min:0,max:0.75}).toFixed(2),
        }
        coupons.push(coupon);
        console.log(coupon);
    }
    
    await prisma.cupom.createMany({data:coupons})
}
