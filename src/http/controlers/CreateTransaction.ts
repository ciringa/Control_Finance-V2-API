import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { CreateTransactionUseCase } from "../../services/CreateTransaction";
import { PrismaTransactionsRepositorie } from "../../repositorie/PrismaRepositories/PrismaTransactions";
import { PrismaAccountRepositorie } from "../../repositorie/PrismaRepositories/PrismaAccountRepositorie";
import { AccountDoesNotExists } from "../../services/Error/MissedResourcesError";
import { InvalidTagProvidedToTransactionType } from "../../services/Error/WrongProvidedParams";

export async function CreateTransaction(req:FastifyRequest,res:FastifyReply){
    const bodySchema = z.object({
        Title: z.string(),
        Value: z.number(),
        Type:  z.enum(["DEP","SAL"]),
        accountId:z.string().uuid(),
        Categories:z.enum([
            "Alimentacao", "Educacao","Laser","Saude","Eletronicos","Compras","Beleza","Veiculo","Roupas","Investimento","Salario","Comissao","Outro"
        ]).optional(),
        CreatedAt:z.date().optional()
    })

    const {CreatedAt,Title,Type,Value,accountId,Categories} = bodySchema.parse(req.body)
    const Main = new CreateTransactionUseCase(new PrismaTransactionsRepositorie, new PrismaAccountRepositorie)
    //const doesTheLoggedInUserOwnsTheAccountThatWannaAccess = null
    try{
        const Transaction =  await Main.execute({data:{
            accountId,Title,Type,Value,Categories,CreatedAt
        }})
        //console.log(Transaction)
        res.status(201).send({
            Description:"created Transaction successfully",
            Transaction:Transaction.Transaction
        })
    }catch(err){
        //console.log(err)
        if(err instanceof AccountDoesNotExists){
            res.status(404).send("Missing or invalid AccountId")
        }else if(err instanceof InvalidTagProvidedToTransactionType){
            res.status(401).send("the provided categorie is invalid for the provided type")
        }
    }
}