import { Prisma, Transaction } from "@prisma/client";
import { TransactionsRepositorie } from "../repositorie/transactions.repositorie";
import { AccountRepositorie } from "../repositorie/account.repositorie";
import { AccountDoesNotExists } from "./Error/MissedResourcesError";


interface CreateTransactionResquest{
    data:Prisma.TransactionUncheckedCreateInput,
}
interface CreateTransactionResponse{
    Transaction:Transaction
}
export class CreateTransactionUseCase {
    constructor(private transactionRepositorie:TransactionsRepositorie, private accountRepositorie:AccountRepositorie){}
    async execute({data}:CreateTransactionResquest):Promise<CreateTransactionResponse>{
        ///checks if the Account Exists
        const doesTheAccountExists = await this.accountRepositorie.findById(data.accountId)
        if(!doesTheAccountExists){
            throw new AccountDoesNotExists
        }else{
        //In the Future writes here some code bullshit about transactions values
        //create transaction 
            const Transaction = await this.transactionRepositorie.create(data)
            return {
                Transaction
            }
        }
    }
}