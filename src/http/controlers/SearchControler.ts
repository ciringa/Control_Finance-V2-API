import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ReturnSearchByQueryUseCase } from "../../services/SearchBarUseCase";
import { PrismaTransactionsRepositorie } from "../../repositorie/PrismaRepositories/PrismaTransactions";
import { PrismaAccountRepositorie } from "../../repositorie/PrismaRepositories/PrismaAccountRepositorie";


export async function SearchControler(req:FastifyRequest,res:FastifyReply) {
    const requestParamsSchema = z.object({
        Query:z.string(),
        Page:z.string().default("1")
    })
    const UserId = req.user.sub
    const {Query,Page} = requestParamsSchema.parse(req.params)
    const Main = new ReturnSearchByQueryUseCase(new PrismaTransactionsRepositorie, new PrismaAccountRepositorie)
    try{
        const search = await Main.execute({Page:Number(Page),Query,UserId})
        res.status(200).send(search)
    }
    catch(err){

    }
}