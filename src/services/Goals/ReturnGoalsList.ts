
//retorna a lista de metas separando-as entre completas, nao completas e experiadas

import { Goals } from "@prisma/client";
import { goalsRepositorie } from "../../repositorie/goals.repositorie";
import { userRepositorie } from "../../repositorie/user.repositorie";
import { UserDoesNotExists } from "../.Error/MissedResourcesError";
import { isDateAfter } from "../../utils/CompareDates";

interface ReturnGoalListRequest{
    UserId:string
}
interface ReturnGoalListResponse{
    unCompletedGoals:Goals[],
    ExpiredGoals:Goals[],
    CompletedGoals:Goals[],
}

export class ReturnGoalListUseCase{
    constructor(private goalRepositorie:goalsRepositorie,private UserRepositorie:userRepositorie){}
    async execute({UserId}:ReturnGoalListRequest):Promise<ReturnGoalListResponse>{
            //checks if the user exists
            const doesTheUserExists = await this.UserRepositorie.findById(UserId)
            if(!doesTheUserExists){
                throw new UserDoesNotExists
            }   
            const ReturnGoalsList = await this.goalRepositorie.findByUser(UserId)
            var unCompleted:Goals[]= [],Completed:Goals[]= [],Expired:Goals[] = []
            ReturnGoalsList?.forEach(async Element =>{
                if(Element.Value>=Element.TargetedValue){
                    Completed.push(Element)
                }else if(isDateAfter(Element.EndTime,new Date())){
                    Expired.push(Element)
                }else{
                    unCompleted.push(Element)
                }
            })
        return {
            unCompletedGoals:unCompleted,
            ExpiredGoals:Expired,
            CompletedGoals:Completed
        }
    }
}