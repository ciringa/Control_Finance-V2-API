import { Prisma, Goals } from "@prisma/client";
import { goalsRepositorie } from "../goals.repositorie";
import { randomUUID } from "crypto";
import { prisma } from "../../lib/prisma";


export class PrismaGoalRepositorie implements goalsRepositorie{
    public list:Goals[] = []
    async create(data: Prisma.GoalsUncheckedCreateInput){
        const _data = await prisma.goals.create({
            data
        })
        return _data
    }
    async findById(Id: string){
        const returnSingle =  await prisma.goals.findUnique({
            where:{
                Id
            }
        })
        return returnSingle 
    }
    async findByQuery(Query: string, Page: number, UserId:string){
        const returnQuery = await prisma.goals.findMany({
            where:{
                userId:UserId,
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
    async findByUser(userId: string) {
        const ReturnMany = await prisma.goals.findMany({
            where:{
                userId,
            }
        })
        return ReturnMany
    }
    async markAsCompleted(Id: string){
        const item = await prisma.goals.update({
            where:{
                Id
            },data:{
                CompletedAt:new Date()
            }
        })
        return item
    }
    async updateGoal(Id: string, data: Partial<Prisma.GoalsUncheckedCreateInput>){
        const updatedGoal = await prisma.goals.update({
            where:{
                Id
            },
            data
        })

        return updatedGoal
    }
    async delete(GoalId: string){
        await prisma.goals.delete({
            where:{
                Id:GoalId
            }
        })
    }
}