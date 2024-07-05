import {FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { AuthUseCase } from "../../services/Authenticate";
import { PrismaUsersRepositorie } from "../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import { UserDoesNotExists } from "../../services/Error/MissedResourcesError";
import { InvalidPassword } from "../../services/Error/ValidationErrors";

export async function AutheticateUser(req:FastifyRequest,res:FastifyReply) {
    const BodySchema = z.object({
        Senha:z.string(),
        Email:z.string()
    })
    const {Senha,Email} = BodySchema.parse(req.body)
    const Main = new AuthUseCase(new PrismaUsersRepositorie)

    try{    
        const returnId = (await Main.execute({Email,Senha})).id
        const Token = await res.jwtSign({},{
            sign:{
                sub:returnId
            }
        })

        res.status(200).send({
            Description:"success logged In",
            Token
        })
    }catch(err){
        if(err instanceof UserDoesNotExists){
            res.status(404).send({
                Description:"User does not exists",
            })
        }
        if(err instanceof InvalidPassword){
            res.status(401).send({
                Description:"Wrong password",
            })
        }
    }
}