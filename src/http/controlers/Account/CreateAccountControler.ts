import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { CreateAccountUseCase } from "../../../services/Account/CreateAccount";
import { PrismaAccountRepositorie } from "../../../repositorie/PrismaRepositories/PrismaAccountRepositorie";
import { PrismaUsersRepositorie } from "../../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import { UserDoesNotExists } from "../../../services/.Error/MissedResourcesError";

export async function CreateAccountControler(req:FastifyRequest, res:FastifyReply){
    const bodySchema = z.object({
        Name:z.string(),
        Value:z.number().optional(),
        Description:z.string().optional(),
        Type:z.enum(["Carteira","Poupanca","ContaBancaria","CorretoraDeInvestimentos"]),
    })
    const {Name,Value,Type,Description} = bodySchema.parse(req.body)
    const userId = req.user.sub
    const Main = new CreateAccountUseCase(new PrismaAccountRepositorie, new PrismaUsersRepositorie)

    try{
        //trys to run CreateAccountUseCase sending "data"
        const CreateAccount = await Main.execute({data:{
            Name,Value,userId,Description,Type
        }})
        console.log({
            Description:"successfully created",
            CreateAccount
        })
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
