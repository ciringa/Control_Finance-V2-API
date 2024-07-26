import { Transaction } from "@prisma/client";
import { AccountRepositorie } from "../repositorie/account.repositorie";
import { TransactionsRepositorie } from "../repositorie/transactions.repositorie";
import { userRepositorie } from "../repositorie/user.repositorie";
import { UserDoesNotExists } from "./Error/MissedResourcesError";


interface AccountStatistcsRequest{
    userId:string
}

interface AccountStatistcsReply{
    Data:{
        TotalAccount:number,
        TotalAccountTransactions:number,
        DEP:number,
        SAL:number
    },
    Relative:{
        DEP:number,
        SAL:number
    }
}
export class AccountStatistcsUseCase {
    constructor(private usersRepositorie:userRepositorie, private accountRepositorie:AccountRepositorie, private transactionRepositorie:TransactionsRepositorie){}
    async execute({userId}:AccountStatistcsRequest):Promise<AccountStatistcsReply | {}>{
        //check if there's any user with the specified email adress
        const doesTheUserExists = await this.usersRepositorie.findById(userId)
        if(!doesTheUserExists){
            throw new UserDoesNotExists
        }
        const doesTheUserHasAnyAccount = await this.accountRepositorie.findByUser(userId)
        if(doesTheUserHasAnyAccount?doesTheUserHasAnyAccount[0]:null){
            return {

            }
        }
        var TransactionList:Transaction[] = [], totalDep:number=0, totalSal:number=0
        const returnAccountUserList = doesTheUserHasAnyAccount
        returnAccountUserList?.forEach(async Element=>{
            const returnAllTransactions = await this.transactionRepositorie.findByAccount(Element.Id)
            returnAllTransactions?.forEach(element => {
                TransactionList.push(element)
            });
        })  

        TransactionList.forEach(async Element=>{
            if(Element.Type=="DEP"){
                totalDep+=1
            }else if(Element.Type == "SAL"){
                totalSal += 1
            }
        })
        
        return {
            Data:{
                TotalAccount:doesTheUserHasAnyAccount?.length,
                TotalAccountTransactions: TransactionList.length,
                DEP:totalDep,
                SAL:totalSal
            },
            Relative:{
                DEP: TransactionList.length*(totalDep/100),
                SAL: TransactionList.length*(totalSal/100)
            }
        }
    }
}