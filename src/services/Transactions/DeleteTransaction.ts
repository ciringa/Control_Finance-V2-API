
import { Prisma, Transaction } from "@prisma/client";
import { TransactionsRepositorie } from "../../repositorie/transactions.repositorie";
import { AccountRepositorie } from "../../repositorie/account.repositorie";
import { AccountDoesNotExists, TransactionDoesNotExists } from "../.Error/MissedResourcesError";


interface DeleteTransactionsRequest{
    Id:string
}
interface DeleteTransactionsResponse{
    Transaction:Transaction,
    Account:{
        Value:number,
        Id:string
    }
}
export class DeleteTransactionsUseCase {
    constructor(private transactionRepositorie:TransactionsRepositorie, private accountRepositorie:AccountRepositorie){}
    async execute({Id}:DeleteTransactionsRequest):Promise<DeleteTransactionsResponse>{
        ///checks if the Transaction Exists
        const doesTheTransactionExists = await this.transactionRepositorie.findById(Id)
        if(!doesTheTransactionExists){
            throw new TransactionDoesNotExists
        }else{
        //In the Future writes here some code bullshit about transactions values
        const {Type,accountId,Value} = doesTheTransactionExists
        var newAccountValue:number = 0
        //only to calcs return the account informations

        const Account = await this.accountRepositorie.findById(accountId)
        if(Account){
            if(Type=="DEP"){
                newAccountValue = (Account.Value - Value)
            }else if(Type=="SAL"){
                newAccountValue = (Account.Value + Value)
            }
        }
        const updateAccount  = await this.accountRepositorie.updateAccountValue(accountId,newAccountValue) 
        //Delete transaction 
            await this.transactionRepositorie.delete(Id)
            return {
                Transaction:doesTheTransactionExists,
                Account:{
                    Value:updateAccount.Value,
                    Id:updateAccount.Id
                }
            }
        }
    }
}