import { fakerPT_BR } from "@faker-js/faker";
import auth from "../../../config/auth";
import { prisma } from "../../../config/prisma";
import { UserCreateInput } from "../../../generated/prisma/models";

export async function UserSeeder(Userqt:number){
    let users: UserCreateInput[] = [];
    for (let i = 0; i < Userqt; i++) {

        let password: string = fakerPT_BR.internet.password();
        //console.log(password);
        let {salt, hash} = auth.generatePassword(password);
   
        let element: UserCreateInput = {
            firstName: fakerPT_BR.person.firstName(),
            lastName: fakerPT_BR.person.lastName(),
            email: fakerPT_BR.internet.email(),
            birthday: fakerPT_BR.date.birthdate(),
            gender: fakerPT_BR.helpers.arrayElement(["MALE","FEMALE", "OTHER"]),
            phone: fakerPT_BR.phone.number(),
            notifications: fakerPT_BR.datatype.boolean(),
            hash: hash,
            salt: salt
        };
        users.push(element);
    }
    await prisma.user.createMany({data:users});
}