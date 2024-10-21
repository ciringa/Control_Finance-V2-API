import { FastifyReply, FastifyRequest } from "fastify";
import { RecoveryCodeUseCase } from "../../../../services/Useful/PasswordRecovery/GenerateRecoveryCode";
import { updateUserController } from "../../User/updateUse";
import { updateUserUseCase } from "../../../../services/User/updateUseCase";
import { PrismaUsersRepositorie } from "../../../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import z from "zod";
import { UserDoesNotExists } from "../../../../services/.Error/MissedResourcesError";
import { CantUpdateInformedData } from "../../../../services/.Error/WrongProvidedParams";

export async function RecoveryPasswordController(req:FastifyRequest,res:FastifyReply) {
    const {ProvidedCode,NewPassword,TriggerEmail} = z.object({
        ProvidedCode:z.string(),
        NewPassword:z.string(),
        TriggerEmail:z.string()
    }).parse(req.params)
    const CompareService = new RecoveryCodeUseCase();
    const repositorie = new PrismaUsersRepositorie
    const EditUser = new updateUserUseCase(repositorie);
    const RecoverCode = req.cookies.Recovery
    try{
        if(RecoverCode){
            const user = await repositorie.findByEmail(TriggerEmail);
            if(user){
                if(await CompareService.CompareRecoveryCode(RecoverCode,ProvidedCode)){
                    //proceeds to update the user
                    const updateUserCode = await EditUser.execute({
                        data:{
                            Senha:NewPassword
                        },
                        userId:user.Id
                    })
                    res.status(201).send({
                        Description:"Switched user password",
                        user:updateUserCode
                    })
                }else{
                    res.status(401).send("Invalid recoveryCode")
                }
            }else{
                res.status(404).send("Cant find any user with the provided email adress")
            }

        }else{
            res.status(401).send("No RecoveryCode founded please run /recovery/genCode")
        }

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