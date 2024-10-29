
import { User, Prisma } from "@prisma/client"
import { userRepositorie } from "../user.repositorie"
import { randomUUID } from "crypto"

export class InMemoryUserRepositorie implements userRepositorie{
    public list:User[] = []
    async create(data:Prisma.UserCreateInput){
        const _data = {
            Email:String(data.Email),
            Senha:String(data.Senha),
            UsernName:String(data.UsernName),
            Id:String(randomUUID()),
            ProfileUrl:String(data.ProfileUrl)
        }
        this.list.push(_data)
        return  _data
    }
   async findByEmail(Email: String){
        const returnObject = this.list.find(item => item.Email == Email)
        return returnObject || null
    }
    async findById(Id: String) {
        const returnObject = this.list.find(item => item.Id == Id)
        return returnObject || null
    }
    async delete(Id: string) {
        const findSingle = this.list.findIndex(item => item.Id == Id)
        this.list.splice(findSingle)
        return this.list[findSingle]
    }
    async update(data: Partial<User>, userId: string){
        const findUnique = this.list.findIndex(item=> item.Id = userId)
        const OldUser = this.list[findUnique]
        this.list[findUnique] = {
            Email: data.Email || OldUser.Email,
            Id: OldUser.Id,
            Senha: data.Senha || OldUser.Senha,
            UsernName:data.UsernName || OldUser.UsernName,
            ProfileUrl:data.ProfileUrl || OldUser.ProfileUrl
        }
        return this.list[findUnique]
    }
    
}