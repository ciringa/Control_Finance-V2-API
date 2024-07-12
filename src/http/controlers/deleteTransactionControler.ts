import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { DeleteTransactionsUseCase } from "../../services/DeleteTransaction";
import { PrismaTransactionsRepositorie } from "../../repositorie/PrismaRepositories/PrismaTransactions";
import { PrismaAccountRepositorie } from "../../repositorie/PrismaRepositories/PrismaAccountRepositorie";
import { TransactionDoesNotExists } from "../../services/Error/MissedResourcesError";


export async function  DeleteTransactionControler(req:FastifyRequest,res:FastifyReply) {
    const paramsSchema = z.object({
        TrId:z.string().uuid()
    })
    const {TrId} = paramsSchema.parse(req.params)
    const Main = new DeleteTransactionsUseCase(new PrismaTransactionsRepositorie(), new PrismaAccountRepositorie())
    try{
        const Return = await Main.execute({Id:TrId})
        res.status(200).send(Return)
    }catch(err){
        if(err instanceof TransactionDoesNotExists){
            res.send(400).send({
                Description:"Transaction does not exists. Please provide a transaction id or a valid one"
            })
        }
    }
}