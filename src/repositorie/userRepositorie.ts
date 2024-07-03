import { Prisma, User } from "@prisma/client";



export interface userRepositorie {
    findByEmail(Email:String):Promise<User | null>
    create(data:Prisma.UserCreateInput):Promise<User>
}