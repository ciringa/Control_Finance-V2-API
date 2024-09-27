
import { goalsRepositorie } from "../../repositorie/goals.repositorie";
import { GoalDoesNotExists } from "../.Error/MissedResourcesError";


interface deleteGoalRequest{
    GoalId:string
}

export class deleteGoalUseCase {
    constructor(private GoalRepositorie:goalsRepositorie){}
    
    async execute({GoalId}:deleteGoalRequest):Promise<void>{
        const doesTheGoalExists = await this.GoalRepositorie.findById(GoalId)
        if(!doesTheGoalExists){
            throw new GoalDoesNotExists
        }
        await this.GoalRepositorie.delete(GoalId)
    }
}