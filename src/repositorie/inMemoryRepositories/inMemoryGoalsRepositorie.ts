import { Prisma, Goals } from "@prisma/client";
import { goalsRepositorie } from "../goals.repositorie";
import { randomUUID } from "crypto";


export class InMemoryGoalsRepositorie implements goalsRepositorie{
    public list:Goals[] = []
    async create(data: Prisma.GoalsUncheckedCreateInput){
        const _data={
            EndTime:new Date(data.EndTime),
            Title:String(data.Title),
            userId:String(data.userId),
            CreatedAt:new Date(),
            CompletedAt:null,
            Id:randomUUID(),
            Value:Number(data.Value)
        }
        this.list.push(_data)
        return _data
    }
    async findById(Id: string){
        const returnSingle = this.list.find(item => item.Id == Id)
        return returnSingle || null
    }
    async findByQuery(Query: string, Page: number, UserId:string){
        const returnQuery = this.list.filter(item=> item.Title.includes(Query)).slice((Page-1)*3,Page*3)
        return returnQuery 
    }
    async findByUser(userId: string) {
        const returnSingle = this.list.filter(item => item.userId == userId)
        return returnSingle || null
    }
    async markAsCompleted(Id: string){
        const index = this.list.findIndex(item=> item.Id==Id)
        this.list[index].CompletedAt = new Date()
        return this.list[index]
    }
}