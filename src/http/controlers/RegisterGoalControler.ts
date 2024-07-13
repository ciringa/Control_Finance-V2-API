import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepositorie } from "../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import { UserDoesNotExists } from "../../services/Error/MissedResourcesError";
import { RegisterGoalUseCase } from "../../services/RegisterGoal";
import { PrismaGoalRepositorie } from "../../repositorie/PrismaRepositories/PrismaGoalRepsoitorie";
import z from "zod";

export async function RegisterGoal(req:FastifyRequest,res:FastifyReply) {
    const bodyRequestSchema = z.object({
        EndTime:z.date(),
        Title:z.string(),
        Value:z.number().optional(),
    })
    const {EndTime,Title,Value} = bodyRequestSchema.parse(req.body)
    const userId = req.user.sub


    const Main = new RegisterGoalUseCase(new PrismaGoalRepositorie,new PrismaUsersRepositorie)

    try{

        const CreatedGoal = await Main.execute({data:{
            EndTime,Title,userId,Value
        }})
        //console.log(Profile)
        res.status(201).send({
            CreatedGoal:CreatedGoal.CreateGoal
        })
    }catch(err){
        if(err instanceof UserDoesNotExists){
            res.status(404).send({
                Description:"User does not exists or wasn't provided",
            })
        }
    }
}