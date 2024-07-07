import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaAccountRepositorie } from "../../repositorie/PrismaRepositories/PrismaAccountRepositorie";
import { returnUserAccountInfoUseCase } from "../../services/returnUserAccountInfo";
import { PrismaUsersRepositorie } from "../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import { UserDoesNotExists } from "../../services/Error/MissedResourcesError";

export async function ReturnAccountInfo(req:FastifyRequest,res:FastifyReply) {
    const userId = req.user.sub
    const Main = new returnUserAccountInfoUseCase(new PrismaUsersRepositorie,new PrismaAccountRepositorie)
    try{
        const ReturnStatistics = await Main.execute({userId})
        //console.log(ReturnStatistics)
        res.status(200).send(ReturnStatistics)
    }catch(err){
        if(err instanceof UserDoesNotExists){
            res.status(404).send("Missing or invalid AccountId")
        }
    }
}