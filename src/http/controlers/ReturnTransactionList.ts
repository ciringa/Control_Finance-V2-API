import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaTransactionsRepositorie } from "../../repositorie/PrismaRepositories/PrismaTransactions";
import { PrismaAccountRepositorie } from "../../repositorie/PrismaRepositories/PrismaAccountRepositorie";
import { PrismaUsersRepositorie } from "../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import { ReturnTransactionByUserUseCase } from "../../services/ReturnTransactionByUser";
import { UserDoesNotExists } from "../../services/Error/MissedResourcesError";

export async function ReturnTransactionList(req:FastifyRequest,res:FastifyReply) {
    const UserId = req.user.sub
    const Main = new ReturnTransactionByUserUseCase(new PrismaTransactionsRepositorie, new PrismaAccountRepositorie,  new PrismaUsersRepositorie)

    try{
        const response = await Main.execute({UserId})
        res.status(200).send(response)
    }catch(err){
        if(err instanceof UserDoesNotExists){
            res.status(400).send({
                Description:"User does not exists",
            })
        }
    }
}