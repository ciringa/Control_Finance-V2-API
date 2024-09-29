import { FastifyReply, FastifyRequest } from "fastify";
import { updateUserUseCase } from "../../../services/User/updateUseCase";
import { PrismaUsersRepositorie } from "../../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import z from "zod";
import { UserDoesNotExists } from "../../../services/.Error/MissedResourcesError";
import { CantUpdateInformedData } from "../../../services/.Error/WrongProvidedParams";


export async function updateUserController(req:FastifyRequest,res:FastifyReply) {
    const Main = new updateUserUseCase(new PrismaUsersRepositorie())
    const {Email,Senha,UsernName} = z.object({
        Email: z.string().email().optional(),
        Senha: z.string().optional(),
        UsernName:z.string().optional(),
    }).parse(req.body)
    console.log("get there")
    const userId = req.user.sub
    try{
        const response = await Main.execute({data:{
            Email,Senha,UsernName
        },userId})

        res.status(201).send({
            Description:"Successfully updated the user",
            Content:response
        })
    }catch(err){
        if(err instanceof UserDoesNotExists){
            res.status(404).send({
                Description:"Can't find any user with the specified UserId",
                Error:err.message
            })
        }
        if(err instanceof CantUpdateInformedData){
            res.status(401).send({
                Description:"cant update the user. Reason: One of the values provided during the update cant be updated",
                Error:err.message
            })
        }
    }
}