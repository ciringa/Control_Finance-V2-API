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
}