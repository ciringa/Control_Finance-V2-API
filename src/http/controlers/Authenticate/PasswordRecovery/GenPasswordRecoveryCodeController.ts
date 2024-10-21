import { FastifyReply, FastifyRequest } from "fastify";
import { RecoveryCodeUseCase } from "../../../../services/Useful/PasswordRecovery/GenerateRecoveryCode";
import { PrismaUsersRepositorie } from "../../../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import z from "zod";
import { CleanCookies } from "../../../midleware/CleanCookies";

export async function GenPasswordRecoveryCodeController(req:FastifyRequest,res:FastifyReply) {
    const Service = new RecoveryCodeUseCase(new PrismaUsersRepositorie)
    
    const {Email} = z.object({
        Email:z.string()
    }).parse(req.params)

    try{
        const execute = await Service.SendCode({Email});
        
        const Recovery = res.setCookie("Recovery",execute,{
            maxAge:1000*60*5 //5 minutos
        });
        const email = res.setCookie("Email",Email,{
            maxAge:1000*60*15 //15 minutos
        })

        res.status(200).send({
            Description:"Successfully generated a code. Code sent to"+Email+" Saved Recovery and Email cookies",
        })
    }catch(err){
        res.status(500).send(err)
    }
}