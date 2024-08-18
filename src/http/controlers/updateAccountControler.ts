import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { updateAccount } from "../../services/EditAccount";
import { PrismaAccountRepositorie } from "../../repositorie/PrismaRepositories/PrismaAccountRepositorie";
import { AccountDoesNotExists } from "../../services/Error/MissedResourcesError";
import { CantUpdateInformedData } from "../../services/Error/WrongProvidedParams";

export async function updateAccountNameControler(req:FastifyRequest,res:FastifyReply) {
    const {AcId} = z.object({
        AcId:z.string().uuid()
    }).parse(req.params)
    const data = z.object({
        Name: z.string(),
    }).parse(req.body)
    const main = new updateAccount(new PrismaAccountRepositorie)
    try{
        const response = await main.execute({
            AcId,data
        })
        res.status(204 ).send({
            Description:"successfully updated"
        })
    }catch(err){
        if(err instanceof AccountDoesNotExists){
            res.status(404).send({
                Description:"can't find the specified Account id"
            })
        }
        //wil never be there
        if(err instanceof CantUpdateInformedData){
            res.status(401).send({
                Description:"Tried to update non permithed data type"
            })
        }
    }
}