import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { CreateTransactionUseCase } from "../../services/CreateTransaction";
import { PrismaTransactionsRepositorie } from "../../repositorie/PrismaRepositories/PrismaTransactions";
import { PrismaAccountRepositorie } from "../../repositorie/PrismaRepositories/PrismaAccountRepositorie";
import { AccountDoesNotExists } from "../../services/Error/MissedResourcesError";

export async function CreateTransaction(req:FastifyRequest,res:FastifyReply){
    const bodySchema = z.object({
        Title: z.string(),
        Value: z.number(),
        Type:  z.enum(["DEP","SAL"]),
        accountId:z.string().uuid(),
    })
    const data = bodySchema.parse(req.body)
    const Main = new CreateTransactionUseCase(new PrismaTransactionsRepositorie, new PrismaAccountRepositorie)
    //const doesTheLoggedInUserOwnsTheAccountThatWannaAccess = null
    try{
        const Transaction =  (await Main.execute({data})).Transaction
        //console.log(Transaction)
        res.status(201).send({
            Description:"created Transaction successfully",
            Transaction
        })
    }catch(err){
        if(err instanceof AccountDoesNotExists){
            res.status(404).send("Missing or invalid AccountId")
        }
    }
}