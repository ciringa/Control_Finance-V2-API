import { Goals } from "@prisma/client";
import { goalsRepositorie } from "../../repositorie/goals.repositorie";
import { GoalDoesNotExists } from "../.Error/MissedResourcesError";
import { CantUpdateInformedData } from "../.Error/WrongProvidedParams";


interface UpdateGoalValueRequest {
    GoalId:string,
    updateData:Partial<Goals>,
}

interface UpdateGoalValueResponse {
    updatedGoal:Goals | null
    OldGoal:Goals
}

export class UpdateGoalCValueUseCase {
    constructor(private GoalsRepository:goalsRepositorie){}
    async execute({GoalId,updateData}:UpdateGoalValueRequest):Promise<UpdateGoalValueResponse>{
        //checks if the goal exists
        const DoesTheGoalExists = await this.GoalsRepository.findById(GoalId)
        if(!DoesTheGoalExists){
            throw new GoalDoesNotExists
        }
        //throw an error if try to update some goals that can't be updated
        if(updateData.CompletedAt || updateData.CreatedAt || updateData.Id || updateData.userId ){
            throw new CantUpdateInformedData
        }
        //update the goal 
        const updatedGoal = await this.GoalsRepository.updateGoal(GoalId, updateData)

        return {
            updatedGoal,
            OldGoal:DoesTheGoalExists
        }
    }
}