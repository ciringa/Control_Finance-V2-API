import { Account, Goals, Transaction } from "@prisma/client";
import { AccountRepositorie } from "../repositorie/account.repositorie";
import { TransactionsRepositorie } from "../repositorie/transactions.repositorie";
import { goalsRepositorie } from "../repositorie/goals.repositorie";

interface ReturnSearchByQueryParams {
    Page:number,
    Query:string,
    UserId:string
}
interface ReturnSearchByQueryResponse {
    static:{
        TotalElementsReturnValue:number
    },
    Transactions:Transaction[] | null,
    Accounts:Account[] | null,
    Goals:Goals[] | null // change this later 
}
export class ReturnSearchByQueryUseCase {
    constructor(private transactionsRepositorie:TransactionsRepositorie, private accountRepositorie:AccountRepositorie, private GoalsRepositorie:goalsRepositorie){}
    async execute({Page,Query,UserId}:ReturnSearchByQueryParams):Promise<ReturnSearchByQueryResponse>{

        //needs to check if these values are actually from the user
        const ReturnTransactionsList = await this.transactionsRepositorie.findByQuery(Query,Page)

        const Transactions:Transaction[] = [] 
        for(var i = 0; i<ReturnTransactionsList.length;i++){
            var RepresentedElement = ReturnTransactionsList[i]
            var ownerAccount = await this.accountRepositorie.findById(RepresentedElement.accountId)
            if(ownerAccount?.userId==UserId){
                Transactions.push(RepresentedElement)
            }
        }
        const ReturnAccountList = await this.accountRepositorie.findByQuery(Query,Page,UserId)
        const ReturnGoalsList = await this.GoalsRepositorie.findByQuery(Query,Page,UserId)
        const TotalElementsReturnValue = ((ReturnAccountList?ReturnAccountList.length:0)+Transactions.length+((ReturnGoalsList?ReturnGoalsList.length:0)))

        return {
            static:{
                TotalElementsReturnValue,
            },
            Transactions,
            Accounts:ReturnAccountList,
            Goals:ReturnGoalsList 
        }
    }
}