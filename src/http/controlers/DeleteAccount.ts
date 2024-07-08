import { FastifyReply, FastifyRequest } from "fastify";

import { PrismaAccountRepositorie } from "../../repositorie/PrismaRepositories/PrismaAccountRepositorie";
import { PrismaUsersRepositorie } from "../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import { UserDoesNotExists } from "../../services/Error/MissedResourcesError";
import { deleteAccountUseCase } from "../../services/DeleteAccount";
import { PrismaTransactionsRepositorie } from "../../repositorie/PrismaRepositories/PrismaTransactions";
import z from "zod";

export async function DeleteAccountControler(req:FastifyRequest, res:FastifyReply){
    //in the future this needs to automatically pick the id based in the JWT Token Adress
    const userId = req.user.sub
    const requestParamsSchema = z.object({
        AcId:z.string().uuid()
    })
    const {AcId} = requestParamsSchema.parse(req.params)
    const Main = new deleteAccountUseCase(new PrismaAccountRepositorie, new PrismaTransactionsRepositorie)

    try{
        //trys to run CreateAccountUseCase sending "data"
        const DeleteAccount = await Main.execute({AcId})
        //if success returns this
        res.status(200).send({
            Description:"successfully deleted the account and all it's transactions",
        })
    }catch(err){
        if(err instanceof UserDoesNotExists){
            res.status(400).send({
                Description:"Account does not exists"
            })
        }
    }
}