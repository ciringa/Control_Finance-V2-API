
import { userRepositorie } from "../repositorie/user.repositorie";
import { UserDoesNotExists } from "./Error/MissedResourcesError";



export class DeleteUserUseCase{
    constructor(private UserRepositorie:userRepositorie){}
    async execute(userid:string){
        const doesTheUserExists = await this.UserRepositorie.findById(userid)
        if(!doesTheUserExists){
            throw new UserDoesNotExists
        }
        //delete user
        const deletedUser = await this.UserRepositorie.delete(userid)
        return {
            deletedUser
        }
    }
}