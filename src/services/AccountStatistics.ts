import { Account, Transaction } from "@prisma/client";
import { AccountRepositorie } from "../repositorie/account.repositorie";
import { TransactionsRepositorie } from "../repositorie/transactions.repositorie";
import { userRepositorie } from "../repositorie/user.repositorie";
import { UserDoesNotExists } from "./Error/MissedResourcesError";
import { ReturnPercentagesList, TransactionCategorieList } from "../utils/PercentageTransactionCategorieCalc";
import { opnionList, Status } from "../utils/ReturnUserOpnionList";
import { goalsRepositorie } from "../repositorie/goals.repositorie";



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
        SAL:number,
        PercentageOfReturnByCategorie:TransactionCategorieList
    },
    AccountState:opnionList
}
export class AccountStatistcsUseCase {
    constructor(private usersRepositorie:userRepositorie, private accountRepositorie:AccountRepositorie, private transactionRepositorie:TransactionsRepositorie, private GoalsRepositorie:goalsRepositorie){}
    async execute({userId}:AccountStatistcsRequest):Promise<AccountStatistcsReply>{
        //check if the user exists
        const doesTheUserExists = await this.usersRepositorie.findById(userId)
        if(!doesTheUserExists){
            throw new UserDoesNotExists
        }
        //checks if the user has any account wich can be found
        const doesTheUserHasAnyAccount = await this.accountRepositorie.findByUser(userId)
        if(!doesTheUserHasAnyAccount){
            //Eu espero que nunca caia aqui !!!
            throw Error("user has no account")
        }
        var TransactionList:Transaction[] = []
        var totalDep:number=0, totalSal:number=0
        const func = async (Element:Account)=>{
            const thisAccountReturnList = await this.transactionRepositorie.findByAccount(Element.Id)
            if(thisAccountReturnList){
                TransactionList = TransactionList.concat(thisAccountReturnList)
            }
        }
        for(let i =0;i<doesTheUserHasAnyAccount.length;i++){
            await func(doesTheUserHasAnyAccount[i])
        }

        TransactionList.forEach(async Element=>{
            if(Element.Type=="DEP"){
                totalDep+=1
            }else if(Element.Type == "SAL"){
                totalSal += 1
            }
        })
        //som
        var metasStatus:Status = Status.Ok
        var GastosStatus:Status
        var EconomiaStatus:Status
        //checkIf the user is completing the goals 
        const GoalsList = await this.GoalsRepositorie.findByUser(userId)
        var completedAmount:number = 0 
        //console.log(GoalsList)
        if(GoalsList){
            //check if goal percentage of completion is higher than spected
            var goalAmount:number = GoalsList.length
            for(let i = 0; i< GoalsList.length;i++){
                if(GoalsList[i].CompletedAt){
                    completedAmount++
                    //console.log(completedAmount)
                }
            }
            //relative/total*100
            var percentage = ((completedAmount/goalAmount)*100)

            if(percentage>=75){
                metasStatus = Status.Good
            }else if(percentage>=50){
                metasStatus = Status.Ok
            }else{
                metasStatus = Status.Danger
            }
        }

        // Checks if the user sal is rightfully used
        var EssentialWithdraw:number = 0,nonEssentialWithdraw:number = 0
        for(let i = 0; i<TransactionList.length;i++){
            if(TransactionList[i].Type=="SAL" && TransactionList[i].Categories!=null){
                switch(TransactionList[i].Categories){
                    case "Alimentacao":EssentialWithdraw++; break;
                    case "Saude": EssentialWithdraw++;break;
                    case "Educacao":EssentialWithdraw++;break;
                    default:nonEssentialWithdraw++;
                }
            }
        }
        if(EssentialWithdraw>nonEssentialWithdraw){
            let total = (EssentialWithdraw+nonEssentialWithdraw)
            var percentage:number = ((EssentialWithdraw / total)*100)
            if(percentage>=75){
                GastosStatus = Status.Good
            }else{
                GastosStatus = Status.Ok
            }
        }else{
            GastosStatus = Status.Danger
        }

        //Economy check (criteria : checks if the account has a good balance income)
        if(totalDep>=totalSal){
            if(totalDep>=totalSal+2000){
                EconomiaStatus = Status.Good
            }else{
                EconomiaStatus = Status.Ok
            }
        }else{
            EconomiaStatus = Status.Danger
        }
        //Investiment check(criteria: checks if the user has invested at least 25% in its deposits)
        
        return {
            Data:{
                TotalAccount:doesTheUserHasAnyAccount?.length,
                TotalAccountTransactions: TransactionList.length,
                DEP:totalDep,
                SAL:totalSal
            },
            Relative:{
                DEP: (totalDep / TransactionList.length) * 100,
                SAL: (totalSal / TransactionList.length) * 100,
                PercentageOfReturnByCategorie:await ReturnPercentagesList(TransactionList)
            },
            AccountState:{
                AndamentoDasMetas: metasStatus,
                Economista:EconomiaStatus,
                GastosEssenciais:GastosStatus,
                Investimentos:Status.Ok //needs to refactor the criteria
            }
        }
    }
}