import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { CreateAccountUseCase } from "../../services/CreateAccount";
import { PrismaAccountRepositorie } from "../../repositorie/PrismaRepositories/inMemoryAccountRepositorie";
import { PrismaUsersRepositorie } from "../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import { UserDoesNotExists } from "../../services/Error/MissedResourcesError";

export async function CreateAccountControler(req:FastifyRequest, res:FastifyReply){
    //in the future this needs to automatically pick the id based in the JWT Token Adress
    const bodySchema = z.object({
        Name:z.string(),
        Value:z.number().optional(),
        userId:z.string().uuid()
    })
    const data = bodySchema.parse(req.body)

    const Main = new CreateAccountUseCase(new PrismaAccountRepositorie, new PrismaUsersRepositorie)

    try{
        //trys to run CreateAccountUseCase sending "data"
        const CreateAccount = await Main.execute({data})
        //if success returns this
        res.status(201).send({
            Description:"successfully created",
            CreateAccount
        })
    }catch(err){
        if(err instanceof UserDoesNotExists){
            res.status(404).send({
                Description:"User does not exists"
            })
        }
    }
}