import { TransactionCategorieList } from "../dtos/enuns/TransactionCategoriesList";
import { prisma } from "../lib/prisma";

export enum Status {
    Danger = "Danger", // red flag
    Ok = "Ok", // yellow flag
    Good = "Good" // green flag
}
export interface opnionList {
    AndamentoDasMetas: Status, // checks if the metas are greater than a preseted amount
    GastosEssenciais: Status, // 
    Investimentos: Status,
    Economista: Status
}

export async function ReturnUserStatus(userId:string,data:TransactionCategorieList): Promise<opnionList> {
    var metasStatus:Status
    var GastosEstatus:Status
    //checkIf the user is completing the goals 
    const GoalsList = await prisma.goals.findMany({where:{
        userId,
    }})
    //check if goal percentage of completion is higher than spected
    var completedAmount:number = 0, goalAmount:number = GoalsList.length
    for(let i = 0; i<= GoalsList.length;i++){
        if(GoalsList[i].CompletedAt){
            completedAmount++
        }
    }
    var percentage = (completedAmount/goalAmount)*100
    if(percentage>=75){
        metasStatus = Status.Good
    }else if(percentage>=50){
        metasStatus = Status.Ok
    }else{
        metasStatus = Status.Danger
    }



    return{
        AndamentoDasMetas: metasStatus,
        GastosEssenciais: Status.Danger,
        Investimentos: Status.Ok,
        Economista: Status.Ok
    }
}