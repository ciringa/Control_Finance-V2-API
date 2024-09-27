import { Account, Goals } from "@prisma/client";
import { AccountRepositorie } from "../../repositorie/account.repositorie";
import { AccountDoesNotExists } from "../.Error/MissedResourcesError";
import { CantUpdateInformedData } from "../.Error/WrongProvidedParams";


interface deleteManyRequest{
    AcId:string
    data:Partial<Account>
}

export class updateAccount {
    constructor(private accountRepositorie:AccountRepositorie){}
    
    async execute({AcId,data}:deleteManyRequest):Promise<void>{
        const doesTheAccountExists = await this.accountRepositorie.findById(AcId)
        if(!doesTheAccountExists){
            throw new AccountDoesNotExists
        }
        if(data.Id || data.userId || data.Value){
            throw new CantUpdateInformedData
        }
        await this.accountRepositorie.update(AcId,data)
    }
}