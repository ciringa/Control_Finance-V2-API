import { number } from "zod";
import { AccountRepositorie } from "../repositorie/account.repositorie";
import { TransactionsRepositorie } from "../repositorie/transactions.repositorie";
import { AccountDoesNotExists } from "./Error/MissedResourcesError";
import { Account, Transaction } from "@prisma/client";

interface returnAccountDataParams{
    Id:string
}
interface returnAccountDataResponse{
    Account:Account,
    statistic:{
        Deposit:number,
        Withdraw:number,
        Total:number,
        sum:number,
        TransactionAmount:number | undefined,
    },
    TransactionList:Transaction[] | null
}

export class returnAccountDataUseCase {
    constructor(private accountRepositorie:AccountRepositorie, private transactionRepositorie:TransactionsRepositorie){}
    async execute({Id}:returnAccountDataParams):Promise<returnAccountDataResponse>{
        ///checks if the account exists
        const doesTheAccountExists = await this.accountRepositorie.findById(Id)
        if(!doesTheAccountExists){
            throw new AccountDoesNotExists
        }
        //return the account transaction list
        const AccountTransactionList = await this.transactionRepositorie.findByAccount(Id)
        var sum:number = 0
        var {PosititiveTransaction,NegativeTramsactionSum}={PosititiveTransaction:0,NegativeTramsactionSum:0}
        AccountTransactionList?.forEach(Element =>{
            if(Element.Type=="DEP"){
                sum = (sum+Element.Value)
                PosititiveTransaction= (PosititiveTransaction+Element.Value)
            }else if(Element.Type=="SAL"){
                sum=(sum-Element.Value)
                NegativeTramsactionSum= (NegativeTramsactionSum+Element.Value)
            }
        })
        return {
            Account:doesTheAccountExists,
            statistic:{
                Deposit:PosititiveTransaction,
                Withdraw:NegativeTramsactionSum,
                Total:doesTheAccountExists.Value,
                sum,
                TransactionAmount:AccountTransactionList?.length 
            },
            TransactionList:AccountTransactionList
        }
    }
}