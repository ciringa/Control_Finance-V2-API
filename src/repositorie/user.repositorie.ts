import { Prisma, User } from "@prisma/client";



export interface userRepositorie {
    findByEmail(Email:String):Promise<User | null>
    findById(Id:String):Promise<User | null>
    create(data:Prisma.UserCreateInput):Promise<User>
    delete(Id:string):Promise<User>
    update(data:Partial<User>,userId:string):Promise<User>
}