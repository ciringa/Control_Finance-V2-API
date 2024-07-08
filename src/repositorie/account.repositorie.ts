import { Prisma, Account } from "@prisma/client";



export interface AccountRepositorie {
    create(data:Prisma.AccountUncheckedCreateInput):Promise<Account>
    findById(Id:string):Promise<Account | null>
    updateAccountValue(Id:string,newValue:number):Promise<Account>
    findByUser(userId:string):Promise<Account[] | null>
    delete(Id:string):Promise<void>
}