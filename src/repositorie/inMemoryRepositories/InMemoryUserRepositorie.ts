
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
            Id:String(randomUUID())
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
    
}