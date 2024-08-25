import { Transaction } from "@prisma/client";
import { AccountRepositorie } from "../repositorie/account.repositorie";
import { TransactionsRepositorie } from "../repositorie/transactions.repositorie";
import { userRepositorie } from "../repositorie/user.repositorie";
import { AccountDoesNotExists, UserDoesNotExists } from "./Error/MissedResourcesError";



export class ResetUserAccountUseCase{
    constructor(private UserRepositorie:userRepositorie, private accountRepositorie:AccountRepositorie, private transactionRepositorie:TransactionsRepositorie){}
    async execute(userid:string){
        const doesTheUserExists = await this.UserRepositorie.findById(userid)
        if(!doesTheUserExists){
            throw new UserDoesNotExists
        }

        //delete every account and transactions that this user owns 
        const AccountList = await this.accountRepositorie.findByUser(userid);
        var transactionList:Transaction[] | null = null
        if(!AccountList){
            throw new AccountDoesNotExists
        }
        for(let i =0;i<AccountList.length;i++){
            transactionList  = await this.transactionRepositorie.findByAccount(AccountList[i].Id)
            if(transactionList){
                for(let j=0;j<transactionList.length;j++){
                    await this.transactionRepositorie.delete(transactionList[j].Id)
                }
            }
            await this.accountRepositorie.delete(AccountList[i].Id)
        }

        return {
            TotalTransactionsDeleted: transactionList? transactionList.length:0,
            TotalAccountsDeleted: AccountList? AccountList.length:0,
        }
    }
}