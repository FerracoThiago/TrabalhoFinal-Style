import { prisma } from "../../config/prisma";
import { UserSeeder } from "./seeds/userSeeder";
import { ProductSeeder } from "./seeds/productSeeder";

async function main() {
    await prisma.$connect();

    await UserSeeder(20);
    await ProductSeeder(20);
}

const resultado: Promise<void> = main();

resultado.then(async () => {
    await prisma.$disconnect();
});

resultado.catch(async (e: any) => {
    console.log(e);
    await prisma.$disconnect();
});