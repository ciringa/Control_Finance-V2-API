import { Goals, Transaction } from "@prisma/client";
import { AccountRepositorie } from "../../repositorie/account.repositorie";
import { TransactionsRepositorie } from "../../repositorie/transactions.repositorie";
import { userRepositorie } from "../../repositorie/user.repositorie";
import { AccountDoesNotExists, UserDoesNotExists } from "../.Error/MissedResourcesError";
import { goalsRepositorie } from "../../repositorie/goals.repositorie";



export class ResetUserAccountUseCase{
    constructor(
        private UserRepositorie:userRepositorie, 
        private accountRepositorie:AccountRepositorie, 
        private transactionRepositorie:TransactionsRepositorie,
        private GoalsRepositorie:goalsRepositorie
    ){}
    async execute(userid:string){
        const doesTheUserExists = await this.UserRepositorie.findById(userid)
        if(!doesTheUserExists){
            throw new UserDoesNotExists
        }

        //delete every account and transactions that this user owns 
        const AccountList = await this.accountRepositorie.findByUser(userid);
        var transactionList:Transaction[] | null = null
        const goalsList:Goals[] | null = await this.GoalsRepositorie.findByUser(userid)
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
        if(goalsList){
            for(let i=0;i<goalsList.length;i++){
                await this.GoalsRepositorie.delete(goalsList[i].Id)
            }
        }

        return {
            TotalTransactionsDeleted: transactionList? transactionList.length:0,
            TotalAccountsDeleted: AccountList? AccountList.length:0,
            TotalGoalsDeleted:goalsList? goalsList.length:0
        }
    }
}