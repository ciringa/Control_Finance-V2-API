import { Prisma, User } from "@prisma/client";
import { userRepositorie } from "../../repositorie/user.repositorie";
import { EmailAlreadyExists } from "../.Error/ValidationErrors";
import { hash } from "bcryptjs";
import { SALT } from "../../lib/env";


//Expected parameter to provide
interface UserCreateArgs{
    data:Prisma.UserCreateInput
}
//Expected Return
interface UserCreateResponse{
    Data:User
}

//Register an User 
export class RegisterUserUseCase {
    constructor(private UserRepositorie:userRepositorie){}
    async execute({data}:UserCreateArgs):Promise<UserCreateResponse>{
        //Checks if the user Email is currently in use throw a EmailAlreadyExists Error if true
        const checkIfTheEmailIsAlreadyInUse = await this.UserRepositorie.findByEmail(data.Email)
        if(checkIfTheEmailIsAlreadyInUse){
            throw new EmailAlreadyExists
        }
        //encrypt the password using bcryptjs
        var {Email,Senha,UsernName} = data
        const salt = Number(SALT)
        Senha = await hash(Senha,9)
        //Register the user in the provided database
        const RegisterUserByData = await this.UserRepositorie.create({
            Email,
            Senha,
            UsernName
        })

        //returns the info as expected 
        return {
            Data:RegisterUserByData
        }
    }
}