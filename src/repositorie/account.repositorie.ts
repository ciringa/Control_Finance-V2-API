import { Prisma, Account } from "@prisma/client";



export interface AccountRepositorie {
    create(data:Prisma.AccountUncheckedCreateInput):Promise<Account>
}