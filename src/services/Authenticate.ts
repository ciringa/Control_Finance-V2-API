import { compare } from "bcryptjs";
import { userRepositorie } from "../repositorie/user.repositorie";
import { UserDoesNotExists } from "./Error/MissedResourcesError";
import { InvalidPassword } from "./Error/ValidationErrors";


interface AuthUseCaseParams{
    Email:string,
    Senha:string
}
interface AuthUseCaseResponse{
    id:string
}

export class AuthUseCase{
    constructor(private UserRepositorie:userRepositorie){}
    async execute({Email,Senha}:AuthUseCaseParams):Promise<AuthUseCaseResponse>{
        //check if there's any user with the specified email adress
        const doesTheUserExists = await this.UserRepositorie.findByEmail(Email)

        if(!doesTheUserExists){
            throw new UserDoesNotExists
        }
        ///check if the password matches 
        const doesTheProvidedPasswordMatches = await compare(Senha, doesTheUserExists.Senha)
        console.log(doesTheUserExists.Senha,Senha)
        if(doesTheProvidedPasswordMatches==false){
            throw new InvalidPassword
        }

        //return user data if the password matches
        return{
            id:doesTheUserExists.Id
        }

    }
}