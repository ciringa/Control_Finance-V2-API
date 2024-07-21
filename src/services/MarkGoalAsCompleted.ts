import { goalsRepositorie } from "../repositorie/goals.repositorie";
import { isDateAfter } from "../utils/CompareDates";
import { GoalDoesNotExists } from "./Error/MissedResourcesError";


interface MarkGoalAsCompletedRequest {
    GoalId:string
}



interface MarkGoalAsCompletedResponse {
    CompletedAt:Date | null,
    CreatedAt:Date
}

export class MarkGoalAsCompletedUseCase {
    constructor(private goalRepositorie:goalsRepositorie){}
    async execute({GoalId}:MarkGoalAsCompletedRequest):Promise<MarkGoalAsCompletedResponse | null>{
        //checks if the goal exists
        const DoesTheGoalExists = await this.goalRepositorie.findById(GoalId)
        if(!DoesTheGoalExists){
            throw new GoalDoesNotExists
        }
        //checks if the goal can be validated
        if(DoesTheGoalExists.Value>=DoesTheGoalExists.TargetedValue && isDateAfter(DoesTheGoalExists.EndTime, new Date())){
            const markAsCompleted = await this.goalRepositorie.markAsCompleted(GoalId)
            return {
                CompletedAt:markAsCompleted.CompletedAt,
                CreatedAt:markAsCompleted.CreatedAt
            }
        }
        return null
    }
}