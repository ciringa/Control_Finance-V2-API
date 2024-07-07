import { Prisma, Transaction } from "@prisma/client";

export interface TransactionsRepositorie{
    create(data:Prisma.TransactionUncheckedCreateInput):Promise<Transaction>
    findById(Id:string):Promise<Transaction | null>
    findByAccount(accountId:string):Promise<Transaction[] | null>
}