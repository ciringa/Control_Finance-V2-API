import { FastifyReply, FastifyRequest } from "fastify";
import { AccountStatistcsUseCase } from "../../../services/Analytics/AccountStatistics";
import { PrismaUsersRepositorie } from "../../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import { PrismaAccountRepositorie } from "../../../repositorie/PrismaRepositories/PrismaAccountRepositorie";
import { PrismaTransactionsRepositorie } from "../../../repositorie/PrismaRepositories/PrismaTransactions";
import { UserDoesNotExists } from "../../../services/.Error/MissedResourcesError";
import { PrismaGoalRepositorie } from "../../../repositorie/PrismaRepositories/PrismaGoalRepsoitorie";

export async function ReturnStatisticControler(req:FastifyRequest, res:FastifyReply) {
    const userId = req.user.sub

    const Main = new AccountStatistcsUseCase(new PrismaUsersRepositorie, new PrismaAccountRepositorie,
                                             new PrismaTransactionsRepositorie, new PrismaGoalRepositorie)
    try{
        const response = await Main.execute({userId})

        res.status(200).send(response)
    }catch(err){
        if( err instanceof UserDoesNotExists){
            res.status(400).send({
                Description:"user does not exists"
            })
        }
    }
}