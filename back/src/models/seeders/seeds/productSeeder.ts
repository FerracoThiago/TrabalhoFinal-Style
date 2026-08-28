import { fakerPT_BR } from "@faker-js/faker";
import { prisma } from "../../../config/prisma";

export async function ProductSeeder(productQt: number) {
    const defaultImage = "uploads/photos/default-photo.png"; 

    for (let i = 0; i < productQt; i++) {
        const hasDiscount = fakerPT_BR.datatype.boolean();

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

        const product = {
            name: fakerPT_BR.commerce.productName(),
            description: fakerPT_BR.commerce.productDescription(),
            price: Number(fakerPT_BR.commerce.price({ min: 10, max: 500 })),
            discount: hasDiscount ? fakerPT_BR.number.float({ min: 10, max: 50 }) : null,
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
                },
                images: {
                    create: {
                        fileName: defaultImage
                    }
                }
            },
            include: { variants: true, images: true }
        });
    }
}