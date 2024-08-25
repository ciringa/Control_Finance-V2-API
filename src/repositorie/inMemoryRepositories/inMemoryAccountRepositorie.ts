import { Account, AccountType, Prisma } from "@prisma/client";
import { AccountRepositorie } from "../account.repositorie";
import { randomUUID } from "crypto";

export class InMemoryAccountRepositorie implements AccountRepositorie{
    public list:Account[] = []
    async create(data:Prisma.AccountUncheckedCreateInput){
        const _data = {
            Name:String(data.Name),
            userId:String(data.userId),
            Id:String(randomUUID()),
            Value:data.Value || 0,
            Type:data.Type as AccountType
        }
        this.list.push(_data)
        return _data
    }
    async findById(Id: string){
        const returnSingle = this.list.find(item => item.Id == Id)
        return returnSingle || null
    }
    async updateAccountValue(Id: string, newValue: number){
        const updateIndex = this.list.findIndex(item=> item.Id == Id)
        this.list[updateIndex].Value = newValue
        const updatedAccount = this.list[updateIndex]
        return updatedAccount
    }
    async findByUser(userId: string) {
        const returnSingle = this.list.filter(item => item.userId == userId)
        return returnSingle || null
    }
    async delete(Id: string){
        const findSingle = this.list.findIndex(item => item.Id == Id)
        this.list.splice(findSingle)
    }
    async update(Id:string, data: Partial<Account>){
        const findIndex = this.list.findIndex(item => item.Id == Id)
        const Original = this.list[findIndex]
        this.list[findIndex] = {
            userId: data.userId || Original.userId, 
            Name:data.Name || Original.Name,
            Value: data.Value || Original.Value,
            Id:Original.Id,
            Type:data.Type as AccountType
        }
        return this.list[findIndex]
    }
    async findByQuery(Query: string, Page: number){
        const returnQuery = this.list.filter(item=> item.Name.includes(Query)).slice((Page-1)*3,Page*3)
        return returnQuery 
    }
    
}