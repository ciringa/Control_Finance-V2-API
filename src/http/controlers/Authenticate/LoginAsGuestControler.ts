import {FastifyReply, FastifyRequest } from "fastify";
import { AuthUseCase } from "../../../services/Authenticate";
import { PrismaUsersRepositorie } from "../../../repositorie/PrismaRepositories/PrismaUserRepositorie";

export async function LoginAsGuestControler(req:FastifyRequest,res:FastifyReply) {
    const Email = "dev@gmail.com"
    const Senha = "admin"
    const Main = new AuthUseCase(new PrismaUsersRepositorie)

    try{    
        const returnId = (await Main.execute({Email,Senha})).id
        const Token = await res.jwtSign({},{
            sign:{
                sub:returnId
            }
        })

        res.status(200).send({
            Description:"Logged in as a guest, all the infos of this account are public",
            Token
        })
    }catch(err){
    }
}