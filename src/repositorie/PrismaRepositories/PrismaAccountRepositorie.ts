import { Account, Prisma } from "@prisma/client";
import { AccountRepositorie } from "../account.repositorie";
import { randomUUID } from "crypto";
import { prisma } from "../../lib/prisma";

export class PrismaAccountRepositorie implements AccountRepositorie{

    async create(data:Prisma.AccountUncheckedCreateInput){
        const createdObject = await prisma.account.create({
            data
        })
        return createdObject
    }
    async findById(Id: string){
        const returnSingle = await prisma.account.findUnique({
            where:{
                Id
            }
        })
        return returnSingle 
    }
    async updateAccountValue(Id: string, newValue: number){
        const updatedValue = await prisma.account.update({
            where:{
                Id
            },data:{
                Value:newValue
            }
        })
        return updatedValue
    }

    async findByUser(userId: string) {
        const returnMany = await prisma.account.findMany({
            where:{
                userId
            }
        })
        return returnMany 
    }
    async delete(Id: string){
        await prisma.account.delete({where:{Id}})
    }
    async update(Id: string, data: Partial<Account>){
        return await prisma.account.update({
            where:{
                Id
            },
            data
        })
    }
}