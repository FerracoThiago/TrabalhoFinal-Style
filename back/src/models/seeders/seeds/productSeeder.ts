import { fakerPT_BR } from "@faker-js/faker";
import { prisma } from "../../../config/prisma";
import { ProductCreateInput } from "../../../generated/prisma/models";

export async function ProductSeeder(productQt: number) {
    for (let i = 0; i < productQt; i++) {
        const variants = [
            {
                size: fakerPT_BR.helpers.arrayElement(['P', 'M', 'G', 'GG']),
                color: fakerPT_BR.helpers.arrayElement(['Preta', 'Branca', 'Azul', 'Vermelha']),
                stock: fakerPT_BR.number.int({ min: 1, max: 50 }),
            },
            {
                size: fakerPT_BR.helpers.arrayElement(['P', 'M', 'G', 'GG']),
                color: fakerPT_BR.helpers.arrayElement(['Preta', 'Branca', 'Azul', 'Vermelha']),
                stock: fakerPT_BR.number.int({ min: 1, max: 50 }),
            },
        ];

        const product: ProductCreateInput = {
            name: fakerPT_BR.commerce.productName(),
            description: fakerPT_BR.commerce.productDescription(),
            price: Number(fakerPT_BR.commerce.price({ min: 10, max: 500 })),
            specification: fakerPT_BR.commerce.productAdjective(),
            tags: [fakerPT_BR.commerce.productAdjective(), fakerPT_BR.commerce.productMaterial()],
            category: fakerPT_BR.commerce.department(),
            inStock: fakerPT_BR.datatype.boolean(),
        };

        await prisma.product.create({
            data: {
                ...product,
                variants: {
                    create: variants
                }
            },
            include: { variants: true }
        });
    }
}