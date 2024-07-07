import { Account } from "@prisma/client";
import { AccountRepositorie } from "../repositorie/account.repositorie";
import { userRepositorie } from "../repositorie/user.repositorie";
import { UserDoesNotExists } from "./Error/MissedResourcesError";

interface returnUserAccountListUseCaseRequest{
    userId:string
}
interface returnUserAccountListUseCaseResponse{
    Statics:{
        sum:number 
    },
    AccountList:Account[] | null
}

export class returnUserAccountInfoUseCase{
    constructor(private UserRepositorie:userRepositorie,private accountRepositorie:AccountRepositorie){}
    async execute({userId}:returnUserAccountListUseCaseRequest):Promise<returnUserAccountListUseCaseResponse>{
        const doesTHeUserExists = await this.UserRepositorie.findById(userId)
        if(!doesTHeUserExists){
            throw new UserDoesNotExists
        }
        //search through a list of acounts to find the user
        const AccountList = await this.accountRepositorie.findByUser(userId)

        //Sum the value of the Account List 
        var sum:number = 0
        AccountList?.forEach(Element =>[
            sum = (sum+Element.Value)
        ])

        return{
            Statics:{
                sum
            },
            AccountList
        }
    }
}