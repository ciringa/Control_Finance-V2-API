import { Prisma, User } from "@prisma/client";
import { userRepositorie } from "../repositorie/userRepositorie";
import { EmailAlreadyExists } from "./Error/ValidationErrors";

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
        //Register the user in the provided database
        const RegisterUserByData = await this.UserRepositorie.create(data)

        //returns the info as expected 
        return {
            Data:RegisterUserByData
        }
    }
}