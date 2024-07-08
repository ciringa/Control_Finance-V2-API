import { AccountRepositorie } from "../repositorie/account.repositorie";
import { TransactionsRepositorie } from "../repositorie/transactions.repositorie";
import { AccountDoesNotExists } from "./Error/MissedResourcesError";



interface deleteManyRequest{
    AcId:string
}

export class deleteAccountUseCase {
    constructor(private accountRepositorie:AccountRepositorie,private transactionRepositorie:TransactionsRepositorie){}
    
    async execute({AcId}:deleteManyRequest):Promise<void>{
        const doesTheAccountExists = await this.accountRepositorie.findById(AcId)
        if(!doesTheAccountExists){
            throw new AccountDoesNotExists
        }
        await this.transactionRepositorie.deleteManyByAccount(AcId)
        await this.accountRepositorie.delete(AcId)
    }
}