import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaTransactionsRepositorie } from "../../../repositorie/PrismaRepositories/PrismaTransactions";
import { PrismaAccountRepositorie } from "../../../repositorie/PrismaRepositories/PrismaAccountRepositorie";
import { PrismaUsersRepositorie } from "../../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import { ReturnTransactionByUserUseCase } from "../../../services/Transactions/ReturnTransactionByUser";
import { UserDoesNotExists } from "../../../services/.Error/MissedResourcesError";
import { ReturnAllTransactionsFromUserUseCase } from "../../../services/Transactions/returnAllUserTransactions";

export async function ReturnTransactionList(req:FastifyRequest,res:FastifyReply) {
    const userId = req.user.sub
    const Main = new ReturnAllTransactionsFromUserUseCase( new PrismaUsersRepositorie,new PrismaTransactionsRepositorie, new PrismaAccountRepositorie, )

    try{
        const response = await Main.execute({userId})
        console.log(response)
        res.status(200).send(response)
    }catch(err){
        if(err instanceof UserDoesNotExists){
            res.status(400).send({
                Description:"User does not exists",
            })
        }
    }
}