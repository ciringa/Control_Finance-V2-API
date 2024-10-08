import { FastifyReply, FastifyRequest } from "fastify";
import { ReturnGoalListUseCase } from "../../../services/Goals/ReturnGoalsList";
import { PrismaGoalRepositorie } from "../../../repositorie/PrismaRepositories/PrismaGoalRepsoitorie";
import { PrismaUsersRepositorie } from "../../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import { GoalDoesNotExists, UserDoesNotExists } from "../../../services/.Error/MissedResourcesError";
import z, { number, string } from "zod";
import { UpdateGoalCValueUseCase } from "../../../services/Goals/updateGoalValue";


export async function UpdateGoalControler(req:FastifyRequest,res:FastifyReply) {
    const paramSchema = z.object({
        GoalId:z.string(),
    })
    var {EndTime,TargetedValue,Title,Value} = z.object({
        Title:z.string().optional(),
        Value: z.number().optional(),
        TargetedValue:z.number().optional(),
        EndTime:z.string(),
    }).parse(req.body)

    const {GoalId} = paramSchema.parse(req.params)
    const Main = new UpdateGoalCValueUseCase(new PrismaGoalRepositorie)
    try{
        const returned = await Main.execute({GoalId,updateData:{
            EndTime:new Date(EndTime),Value,Title,TargetedValue
        }})

        res.status(200).send(returned)
    }catch(err){
        if(err instanceof GoalDoesNotExists){
            res.status(400).send({
                Description:"Goal does not exists",
            })
        }
    }
}