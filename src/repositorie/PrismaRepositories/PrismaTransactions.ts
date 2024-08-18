import { Prisma, Transaction } from "@prisma/client";
import { TransactionsRepositorie } from "../transactions.repositorie";
import { prisma } from "../../lib/prisma";

export class PrismaTransactionsRepositorie implements TransactionsRepositorie{

    async create(data: Prisma.TransactionUncheckedCreateInput){
        const transaction = await prisma.transaction.create({data})
        return transaction
    }
    async findByAccount(accountId: string){
        const returnList = await prisma.transaction.findMany({where:{
            accountId
        }})
        return returnList
    }
    async findById(Id: string){
        const returnSingle = await prisma.transaction.findUnique({where:{Id}})
        return returnSingle
    }
    async delete(Id: string){
        await prisma.transaction.delete({where:{Id}})
    }
    async deleteManyByAccount(AccountId: string){
        await prisma.transaction.deleteMany({where:{accountId:AccountId}})
    }
    async updateTransaction(Id: string, data: Partial<Transaction>){
        return await prisma.transaction.update({
            where:{
                Id
            },
            data
        })
    }
    async findByQuery(Query: string, Page: number){
        const returnQuery = await prisma.transaction.findMany({
            where:{
                Title:{
                    contains:Query,
                    mode: "insensitive"
                }
            },
            skip: (Page-1)*3,
            take:Page*3
        })
        return returnQuery 
    }
}