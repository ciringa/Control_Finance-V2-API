import { FastifyReply, FastifyRequest } from "fastify";
import { ProfileUseCase } from "../../../services/User/profile";
import { PrismaUsersRepositorie } from "../../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import { UserDoesNotExists } from "../../../services/.Error/MissedResourcesError";

export async function ReturnProfile(req:FastifyRequest,res:FastifyReply) {
    const Id = req.user.sub
    console.log(Id)
    const Main = new ProfileUseCase(new PrismaUsersRepositorie)

    try{
        const Profile = await Main.execute({Id})
        console.log(Profile)
        res.status(200).send({
            Description:"successfully returned info",
            Profile:Profile.Profile
        })
        res.redirect("http.cat/200")
    }catch(err){
        if(err instanceof UserDoesNotExists){
            res.status(404).send({
                Description:"User does not exists",
            })
        }
    }
}