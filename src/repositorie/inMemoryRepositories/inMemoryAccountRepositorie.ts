import { Account, Prisma } from "@prisma/client";
import { AccountRepositorie } from "../account.repositorie";
import { randomUUID } from "crypto";

export class InMemoryAccountRepositorie implements AccountRepositorie{
    public list:Account[] = []
    async create(data:Prisma.AccountUncheckedCreateInput){
        const _data = {
            Name:String(data.Name),
            userId:String(data.userId),
            Id:String(randomUUID()),
            Value:data.Value || 0
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
    
}