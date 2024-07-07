
import { InMemoryAccountRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryAccountRepositorie";
import { beforeEach, expect ,it} from "vitest";
import { Account, Prisma, User } from "@prisma/client";
import { returnUserAccountInfoUseCase } from "../../src/services/returnUserAccountInfo";
import { userRepositorie } from "../../src/repositorie/user.repositorie";
import { InMemoryUserRepositorie } from "../../src/repositorie/inMemoryRepositories/InMemoryUserRepositorie";

const UserData:Prisma.UserCreateInput = {
    Email:"testEmail@gmail.com",
    Senha:"testPasword",
    UsernName:"TestUser"
}
const AccountData = {
    Name:"Test Account",
    Value:200,
    userId:"randomUser"
}

var accountRepositorie:InMemoryAccountRepositorie
var ReturnUserAccountList:returnUserAccountInfoUseCase
var UserRepositorie:InMemoryUserRepositorie
var createdAccount:Account
var createUser:User
beforeEach(async()=>{
    accountRepositorie = new InMemoryAccountRepositorie()
    UserRepositorie = new InMemoryUserRepositorie()

    createUser = await UserRepositorie.create(UserData)
    
    const {Name,Value} = AccountData
    await accountRepositorie.create({Name,Value,userId:createUser.Id})
    await accountRepositorie.create({Name,Value,userId:createUser.Id})
    await accountRepositorie.create({Name,Value,userId:createUser.Id})
    ReturnUserAccountList = new returnUserAccountInfoUseCase(UserRepositorie,accountRepositorie)
})


it("should be able to return the user account list",async()=>{
    
    const SUT = await ReturnUserAccountList.execute({
        userId:createUser.Id
    })

    expect(SUT.AccountList).toHaveLength(3)
    expect(SUT.Statics.sum).toBe(600)
    
})