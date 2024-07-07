import { Prisma, Transaction, Type } from "@prisma/client";
import { TransactionsRepositorie } from "../transactions.repositorie";
import { randomUUID } from "crypto";
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
}