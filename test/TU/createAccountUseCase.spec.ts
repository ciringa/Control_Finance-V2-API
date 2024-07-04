
import { InMemoryUserRepositorie } from "../../src/repositorie/inMemoryRepositories/InMemoryUserRepositorie";
import { beforeEach, expect,it } from "vitest";
import { InMemoryAccountRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryAccountRepositorie";
import { Prisma, User } from "@prisma/client";
import { CreateAccountUseCase } from "../../src/services/CreateAccount";
import { UserDoesNotExists } from "../../src/services/Error/MissedResourcesError";


const Userdata:Prisma.UserCreateInput = {
    Email:"testEmail@gmail.com",
    Senha:"testPasword",
    UsernName:"TestUser"
}
var AccountRepositorie:InMemoryAccountRepositorie 
var UserRepositorie:InMemoryUserRepositorie 
var testUser:User
beforeEach(async()=>{
    AccountRepositorie = new InMemoryAccountRepositorie()
    UserRepositorie = new InMemoryUserRepositorie()
    testUser= await UserRepositorie.create(Userdata)

    
})
it("should be able to create an bank account in a user",async()=>{
    const SUT = new CreateAccountUseCase(AccountRepositorie,UserRepositorie)
    const returnAccount = await SUT.execute({
        data:{
            Name:"Test Account",
            Value:200,
            userId:testUser.Id
        }
    })
    expect(returnAccount.createdObject.Value).toBe(200)
    expect(returnAccount.createdObject.userId).toBe(testUser.Id)
})

it("should not be able to create an bank account in a non existent user",async()=>{
    const SUT = new CreateAccountUseCase(AccountRepositorie,UserRepositorie)
    expect(SUT.execute({
        data:{
            Name:"Test Account",
            Value:200,
            userId:"non existent user"
        }
    })).rejects.toBeInstanceOf(UserDoesNotExists)

})