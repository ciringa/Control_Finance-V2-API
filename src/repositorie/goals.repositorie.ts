import { Goals, Prisma } from "@prisma/client";


export interface goalsRepositorie { 
    create(data:Prisma.GoalsUncheckedCreateInput):Promise<Goals>
    findById(Id:string):Promise<Goals |null>
    findByUser(userId:string):Promise<Goals[] | null>
    markAsCompleted(Id:string):Promise<Goals>
    findByQuery(Query:string, Page:number, UserId:string): Promise<Goals[] | null>
}