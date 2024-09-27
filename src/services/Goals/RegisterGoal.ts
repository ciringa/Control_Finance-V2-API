import { Goals, Prisma } from "@prisma/client";
import { goalsRepositorie } from "../../repositorie/goals.repositorie";
import { userRepositorie } from "../../repositorie/user.repositorie";
import { UserDoesNotExists } from "../.Error/MissedResourcesError";


interface RegisterGoalParams{
    data:Prisma.GoalsUncheckedCreateInput
}


interface RegisterGoalResponse{
    CreateGoal:Goals
}
export class RegisterGoalUseCase {
    constructor(private GoalRepositorie:goalsRepositorie, private UserRepositorie:userRepositorie){}
    async execute({data}:RegisterGoalParams):Promise<RegisterGoalResponse>{
        const doesTheUserExists = await this.UserRepositorie.findById(data.userId)
        if(!doesTheUserExists){
            throw new UserDoesNotExists
        }
        //create an goal 
        const CreateGoal = await this.GoalRepositorie.create(data)

        return{
            CreateGoal
        }
    }
}