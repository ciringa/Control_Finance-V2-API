import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MarkGoalAsCompletedUseCase } from "../../../services/Goals/MarkGoalAsCompleted";
import { PrismaGoalRepositorie } from "../../../repositorie/PrismaRepositories/PrismaGoalRepsoitorie";
import { GoalDoesNotExists } from "../../../services/.Error/MissedResourcesError";

export async function MarkGoalAsCompletedControler(req:FastifyRequest,res:FastifyReply) {
    const {GoalId} = z.object({
        GoalId:z.string().uuid()
    }).parse(req.params)

    const Main = new MarkGoalAsCompletedUseCase(new PrismaGoalRepositorie)
    try{
        const resp = await Main.execute({GoalId})
        console.log(resp)
        res.status(200).send(resp)
    }catch(err){
        if(err instanceof GoalDoesNotExists){
            res.status(400).send({
                Description:"Goal does not exists"
            })
        }
    }
}