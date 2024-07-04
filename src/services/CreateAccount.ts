import { Account, Prisma } from "@prisma/client";
import { AccountRepositorie } from "../repositorie/account.repositorie";
import { userRepositorie } from "../repositorie/user.repositorie";
import { UserDoesNotExists } from "./Error/MissedResourcesError";
interface AccountCreateParams{
    data:Prisma.AccountUncheckedCreateInput
}
interface AccountCreateResponse{
    createdObject:Account
}

export class CreateAccountUseCase {
    constructor(private accountRepositorie:AccountRepositorie, private UserRepositorie:userRepositorie){}
    async execute({data}:AccountCreateParams):Promise<AccountCreateResponse>{
        const doesTheProvidedUserIdExists =await this.UserRepositorie.findById(data.userId)
        if(!doesTheProvidedUserIdExists){
            throw new UserDoesNotExists
        }
        
        const createdObject = await this.accountRepositorie.create(data)

        return{
            createdObject
        }
    }
}   