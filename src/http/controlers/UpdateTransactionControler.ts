import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateTransactionUseCase } from "../../services/UpdateTransaction";
import { PrismaTransactionsRepositorie } from "../../repositorie/PrismaRepositories/PrismaTransactions";
import { PrismaAccountRepositorie } from "../../repositorie/PrismaRepositories/PrismaAccountRepositorie";
import z from "zod";
import { TransactionDoesNotExists } from "../../services/Error/MissedResourcesError";

export async function UpdateTransaction(req:FastifyRequest,res:FastifyReply) {
    const {TrId} = z.object({
        TrId:z.string().uuid()
    }).parse(req.params)

    const data = z.object({
        Title:  z.string().optional(),
        Value:z.number().optional(),
        Type: z.enum(["DEP","SAL"]).optional(),
    }).parse(req.body)

    const userid = req.user.sub
    const Main = new UpdateTransactionUseCase(new PrismaTransactionsRepositorie, new PrismaAccountRepositorie)

    try{
        const response = await Main.execute({Id:TrId,data})
        res.status(200).send(response)
    }catch(err){
        if(err instanceof TransactionDoesNotExists){
            res.send(400).send({
                Description:"Transaction does not exists. Please provide a transaction id or a valid one"
            })
        }
    }
}