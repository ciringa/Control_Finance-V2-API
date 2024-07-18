import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaAccountRepositorie } from "../../repositorie/PrismaRepositories/PrismaAccountRepositorie";
import { returnUserAccountInfoUseCase } from "../../services/returnUserAccountInfo";
import { PrismaUsersRepositorie } from "../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import { UserDoesNotExists } from "../../services/Error/MissedResourcesError";
import { PrismaTransactionsRepositorie } from "../../repositorie/PrismaRepositories/PrismaTransactions";

export async function ReturnAccountInfo(req:FastifyRequest,res:FastifyReply) {
    const userId = req.user.sub
    const Main = new returnUserAccountInfoUseCase(new PrismaUsersRepositorie,new PrismaAccountRepositorie, new PrismaTransactionsRepositorie)
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