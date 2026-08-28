import { prisma } from "../../config/prisma";
import { couponSeeder } from "./seeds/couponSeeder";
import { ProductSeeder } from "./seeds/productSeeder";
import { UserSeeder } from "./seeds/userSeeder";

async function main(){
    await prisma.$connect();
    await UserSeeder(20); //demais seeders aqui após este
    await ProductSeeder(20);
    await couponSeeder(20);
}

const resultado: Promise<void> = main();

resultado.then(async()=>{
    await prisma.$disconnect();
});

resultado.catch(async(e:any)=>{
    console.log(e);
    await prisma.$disconnect();
});