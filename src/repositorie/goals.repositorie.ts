import { Goals, Prisma } from "@prisma/client";


export interface goalsRepositorie { 
    create(data:Prisma.GoalsUncheckedCreateInput):Promise<Goals>
    findById(Id:string):Promise<Goals>
    findByUser(userId:string):Promise<Goals>
    markAsCompleted(Id:string):Promise<Goals>
}