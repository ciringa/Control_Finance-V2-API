import { User } from "@prisma/client";
import { userRepositorie } from "../../repositorie/user.repositorie";
import { UserDoesNotExists } from "../.Error/MissedResourcesError";
import { CantUpdateInformedData } from "../.Error/WrongProvidedParams";
import { SALT } from "../../lib/env";
import { hash } from "bcryptjs";

interface updateUserRequest{
    data: Partial<User>,
    userId:string
}

export class updateUserUseCase {
    constructor(private UserRepositorie:userRepositorie){}
    async execute({data,userId}:updateUserRequest):Promise<User>{
        const doesTheUserExists = await this.UserRepositorie.findById(userId)
        
        if(!doesTheUserExists){
            throw new UserDoesNotExists
        }
        //checks if the user is trying to update non permited things 
        if(data.Id){
            throw new CantUpdateInformedData
        }
        var {Email,UsernName,Senha} = data
        if(Senha){
            Senha = await hash(Senha,9)
        }else{
            Senha = doesTheUserExists.Senha
        }
        const updated = await this.UserRepositorie.update({
            Email,UsernName,Senha
        },userId)
        
        return updated 
    }
}