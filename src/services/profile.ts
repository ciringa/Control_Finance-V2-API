import { User } from "@prisma/client";
import { userRepositorie } from "../repositorie/user.repositorie";
import { UserDoesNotExists } from "./Error/MissedResourcesError";

interface ProfileUseCaseParams{
    Id:string
}
interface ProfileUseCaseResponse{
    Profile:User
}

export class ProfileUseCase{
    constructor(private UserRepositorie:userRepositorie){}
    async execute({Id}:ProfileUseCaseParams):Promise<ProfileUseCaseResponse>{
        //checks if the user exists
        const doesTheUserExists = await this.UserRepositorie.findById(Id)
        if(!doesTheUserExists){
            throw new UserDoesNotExists
        }   

        return{
            Profile:doesTheUserExists
        }
    }
}