import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ResetUserAccountUseCase } from "../../services/ResetUser";
import { PrismaUsersRepositorie } from "../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import { PrismaAccountRepositorie } from "../../repositorie/PrismaRepositories/PrismaAccountRepositorie";
import { PrismaTransactionsRepositorie } from "../../repositorie/PrismaRepositories/PrismaTransactions";
import { AccountDoesNotExists, UserDoesNotExists } from "../../services/Error/MissedResourcesError";
import { DeleteUserUseCase } from "../../services/deleteUserUseCase";
import { PrismaGoalRepositorie } from "../../repositorie/PrismaRepositories/PrismaGoalRepsoitorie";

export async function DeleteUserControler(req:FastifyRequest,res:FastifyReply) {
    const userId = req.user.sub

    const Main = new ResetUserAccountUseCase(new PrismaUsersRepositorie,
                                             new PrismaAccountRepositorie,
                                             new PrismaTransactionsRepositorie,
                                             new PrismaGoalRepositorie
    )
    const second = new DeleteUserUseCase(new PrismaUsersRepositorie)
    try{
        const result = await Main.execute(userId)
        const {deletedUser} = await second.execute(userId)
        res.status(200).send({
            Description:"User successfully deleted",
            result,
            deletedUser
        })
    }catch(err){
        if(err instanceof UserDoesNotExists){
            res.status(400).send({
                Description:"User does not exists"
            })
        }
    }
}