import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { returnAccountDataUseCase } from "../../services/ReturnAccountData";
import { PrismaAccountRepositorie } from "../../repositorie/PrismaRepositories/PrismaAccountRepositorie";
import { PrismaTransactionsRepositorie } from "../../repositorie/PrismaRepositories/PrismaTransactions";
import { AccountDoesNotExists } from "../../services/Error/MissedResourcesError";



export async function ReturnAccountStatiscticControler(req:FastifyRequest,res:FastifyReply) {
    const ParamsSchema = z.object({
        AcId:z.string().uuid()
    })
    const {AcId} = ParamsSchema.parse(req.params)

    const Main = new returnAccountDataUseCase(new PrismaAccountRepositorie, new PrismaTransactionsRepositorie)

    try{
        const ReturnStatistics = await Main.execute({Id:AcId})
        //console.log(ReturnStatistics)
        res.status(200).send(ReturnStatistics)
    }catch(err){
        if(err instanceof AccountDoesNotExists){
            res.status(404).send("Missing or invalid AccountId")
        }
    }
}