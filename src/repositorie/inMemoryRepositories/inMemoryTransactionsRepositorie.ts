import { Prisma, Transaction, TransactionCategories, Type } from "@prisma/client";
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
            Id:String(randomUUID()),
            CreatedAt:new Date(),
            Categories:data.Categories as TransactionCategories
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
    //nunca ira chegar ate aqui se a transaçao nao existir 
    async updateTransaction(Id:string, data: Partial<Transaction>){
        const findIndex = this.list.findIndex(item => item.Id == Id)
        const Original = this.list[findIndex]
        this.list[findIndex] = {
            accountId: data.accountId || Original.accountId,
            Title: data.Title || Original.Title,
            Type: data.Type || Original.Type,
            Value: data.Value || Original.Value,
            Id:Original.Id,
            CreatedAt:Original.CreatedAt,
            Categories:data.Categories as TransactionCategories || Original.Categories
        }
        return this.list[findIndex]
    }

    async findByQuery(Query: string, Page: number){
        const returnQuery = this.list.filter(item=> item.Title.includes(Query)).slice((Page-1)*3,Page*3)
        return returnQuery 
    }
}