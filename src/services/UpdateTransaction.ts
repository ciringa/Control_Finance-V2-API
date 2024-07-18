import { Transaction } from "@prisma/client";
import { TransactionsRepositorie } from "../repositorie/transactions.repositorie";
import { AccountDoesNotExists, TransactionDoesNotExists } from "./Error/MissedResourcesError";
import { AccountRepositorie } from "../repositorie/account.repositorie";
import { CantUpdateInformedData } from "./Error/WrongProvidedParams";

interface UpdateTransactionRequest {
    Id:string,
    data:Partial<Transaction>
}
interface UpdateTransactionResponse{
    Old:Transaction,
    New:Transaction,
    AccountValue:{
        Old:Number,
        New:Number
    }
}
export class UpdateTransactionUseCase {
    constructor(private transactionRepositorie:TransactionsRepositorie, private accountRepositorie:AccountRepositorie){}
    async execute({Id,data}:UpdateTransactionRequest):Promise<UpdateTransactionResponse>{
        const doesTHeElementExists = await this.transactionRepositorie.findById(Id)
        if(!doesTHeElementExists){
            throw new TransactionDoesNotExists
        }
        //cant update some data values
        if(data.Id || data.accountId){
            throw new CantUpdateInformedData
        }
        //subtract the account value 
        var newAccountValue:number = 0
        const {Type,accountId,Value} = doesTHeElementExists
        const Account = await this.accountRepositorie.findById(accountId)
        //console.log(Account)
        if(Account){
            const TcValue = Account.Value
            if(Type == "DEP"){
                if(Type=="DEP"){
                    newAccountValue = (TcValue - Value)
                }else if(Type=="SAL"){
                    newAccountValue = (TcValue+ Value)
                }
            }
        }else{
            //never will be there
            throw new AccountDoesNotExists
        }
        //changes the account subtracting the old transaction
        const updateAccount  = await this.accountRepositorie.updateAccountValue(accountId,newAccountValue) 

        //updates the transaction 
        const updateElement = await this.transactionRepositorie.updateTransaction(Id,data)

        //updates the account based in the new transaction value
        newAccountValue = 0

        const newType = updateElement.Type

        if(updateAccount){
            if(newType == "DEP"){
                newAccountValue = (updateAccount.Value+updateElement.Value)
            }else{
                newAccountValue = (updateAccount.Value-updateElement.Value)
            }
        }

        const FinishAccount  = await this.accountRepositorie.updateAccountValue(accountId,newAccountValue) 

        return {
            Old:doesTHeElementExists,
            New:updateElement,
            AccountValue:{
                Old:Account.Value,
                New:FinishAccount.Value
            }
        }
    }
}