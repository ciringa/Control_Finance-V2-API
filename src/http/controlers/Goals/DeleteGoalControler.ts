import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { DeleteTransactionsUseCase } from "../../../services/Transactions/DeleteTransaction";
import { PrismaTransactionsRepositorie } from "../../../repositorie/PrismaRepositories/PrismaTransactions";
import { PrismaAccountRepositorie } from "../../../repositorie/PrismaRepositories/PrismaAccountRepositorie";
import { TransactionDoesNotExists } from "../../../services/.Error/MissedResourcesError";
import { deleteGoalUseCase } from "../../../services/Goals/DeleteGoal";
import { PrismaGoalRepositorie } from "../../../repositorie/PrismaRepositories/PrismaGoalRepsoitorie";


export async function  DeleteGoalControler(req:FastifyRequest,res:FastifyReply) {
    const paramsSchema = z.object({
        GoalId:z.string().uuid()
    })
    const {GoalId} = paramsSchema.parse(req.params)
    const Main = new deleteGoalUseCase(new PrismaGoalRepositorie())
    try{
        const Return = await Main.execute({GoalId})
        res.status(200).send(Return)
    }catch(err){
        if(err instanceof TransactionDoesNotExists){
            res.send(400).send({
                Description:"Goal does not exists. Please provide a goal id or a valid one"
            })
        }
    }
}