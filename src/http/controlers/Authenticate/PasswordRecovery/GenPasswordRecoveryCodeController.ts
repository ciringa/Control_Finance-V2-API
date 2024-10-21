import { FastifyReply, FastifyRequest } from "fastify";
import { RecoveryCodeUseCase } from "../../../../services/Useful/PasswordRecovery/GenerateRecoveryCode";

export async function GenPasswordRecoveryCodeController(req:FastifyRequest,res:FastifyReply) {
    const Service = new RecoveryCodeUseCase()
    try{
        const execute = await Service.genCode();
        res.setCookie("Recovery",execute);
        res.status(200).send({
            Description:"Successfully generated a code"
        })
    }catch(err){
        res.status(500).send(err)
    }
}