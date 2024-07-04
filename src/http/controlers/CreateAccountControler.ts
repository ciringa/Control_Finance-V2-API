import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { CreateAccountUseCase } from "../../services/CreateAccount";
import { PrismaAccountRepositorie } from "../../repositorie/PrismaRepositories/inMemoryAccountRepositorie";
import { PrismaUsersRepositorie } from "../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import { UserDoesNotExists } from "../../services/Error/MissedResourcesError";

export async function CreateAccountControler(req:FastifyRequest, res:FastifyReply){
    const bodySchema = z.object({
        Name:z.string(),
        Value:z.number().optional(),
        userId:z.string().uuid()
    })
    const data = bodySchema.parse(req.body)

    const Main = new CreateAccountUseCase(new PrismaAccountRepositorie, new PrismaUsersRepositorie)

    try{
        const CreateAccount = await Main.execute({data})
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