import { Prisma, Transaction, Type } from "@prisma/client";
import { TransactionsRepositorie } from "../transactions.repositorie";
import { randomUUID } from "crypto";

export class InMemoryTransactionsRepositorie implements TransactionsRepositorie{
    public list:Transaction[] = []
    async create(data: Prisma.TransactionUncheckedCreateInput){
        const _data = {
            accountId:String(data.accountId),
            Title:String(data.Title),
            Type:data.Type as Type,
            Value:Number(data.Value),
            Id:String(randomUUID())
        }
        this.list.push(_data)
        return _data
    }
    async findByAccount(accountId: string){
        const returnList = this.list.filter(item => item.accountId == accountId)
        return returnList
    }
    async findById(Id: string){
        const returnSingle = this.list.find(item => item.Id == Id)
        return returnSingle || null
    }
    async delete(Id: string){
        const findSingle = this.list.findIndex(item => item.Id == Id)
        this.list.splice(findSingle)
    }
    async deleteManyByAccount(AccountId: string){
        for(let i = 0; i<this.list.length; i++){
            if(this.list[i].accountId==AccountId){
                this.list.slice(i)
            }
        }
    }
}