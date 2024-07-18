import { FastifyReply, FastifyRequest } from "fastify";
import { ReturnGoalListUseCase } from "../../services/ReturnGoalsList";
import { PrismaGoalRepositorie } from "../../repositorie/PrismaRepositories/PrismaGoalRepsoitorie";
import { PrismaUsersRepositorie } from "../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import { UserDoesNotExists } from "../../services/Error/MissedResourcesError";


export async function ReturnGoalListControler(req:FastifyRequest,res:FastifyReply) {
    const UserId = req.user.sub
    const Main = new ReturnGoalListUseCase(new PrismaGoalRepositorie, new PrismaUsersRepositorie)
    try{
        const returned = await Main.execute({UserId})
        console.log(returned)
        res.status(200).send(returned)
    }catch(err){
        if(err instanceof UserDoesNotExists){
            res.status(400).send({
                Description:"User does not exists",
            })
        }
    }
}