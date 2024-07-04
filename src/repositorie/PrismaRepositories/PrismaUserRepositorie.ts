
import { User, Prisma } from "@prisma/client"
import { userRepositorie } from "../user.repositorie"
import { randomUUID } from "crypto"
import { prisma } from "../../lib/prisma"

export class PrismaUsersRepositorie implements userRepositorie{
    public list:User[] = []
    async create(data:Prisma.UserCreateInput){
        const createdObject = await prisma.user.create({
            data,
        })
        return createdObject
    }
    async findByEmail(Email:string){
        const returnObject = prisma.user.findUnique({
            where:{
                Email,
            }
        })
        return returnObject
    }
    async findById(Id: string) {
        const returnObject = prisma.user.findUnique({
            where:{
                Id,
            }
        })
        return returnObject
    }
}