import { prisma } from "../../config/prisma";
import { UserSeeder } from "./seeds/userSeeder";

async function main(){
    await prisma.$connect();
    await UserSeeder(20); //demais seeders aqui após este
}

const resultado: Promise<void> = main();

resultado.then(async()=>{
    await prisma.$disconnect();
});

resultado.catch(async(e:any)=>{
    console.log(e);
    await prisma.$disconnect();
});