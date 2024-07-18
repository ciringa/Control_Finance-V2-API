
import { InMemoryAccountRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryAccountRepositorie";
import { beforeEach, expect ,it} from "vitest";
import { Account, Prisma, User } from "@prisma/client";
import { returnUserAccountInfoUseCase } from "../../src/services/returnUserAccountInfo";
import { InMemoryUserRepositorie } from "../../src/repositorie/inMemoryRepositories/InMemoryUserRepositorie";
import { InMemoryTransactionsRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryTransactionsRepositorie";
import { faker } from "@faker-js/faker";

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
var transactionRepositorie:InMemoryTransactionsRepositorie
var UserRepositorie:InMemoryUserRepositorie
var createdAccount:Account
var createUser:User
var mainAccount:Account
beforeEach(async()=>{
    accountRepositorie = new InMemoryAccountRepositorie()
    UserRepositorie = new InMemoryUserRepositorie()
    transactionRepositorie = new InMemoryTransactionsRepositorie()
    createUser = await UserRepositorie.create(UserData)
    
    const {Name,Value} = AccountData
    mainAccount = await accountRepositorie.create({Name,Value,userId:createUser.Id})
    await accountRepositorie.create({Name,Value,userId:createUser.Id})
    await accountRepositorie.create({Name,Value,userId:createUser.Id})
    ReturnUserAccountList = new returnUserAccountInfoUseCase(UserRepositorie,accountRepositorie,transactionRepositorie)
})


it("should be able to return the user account list",async()=>{
    
    const SUT = await ReturnUserAccountList.execute({
        userId:createUser.Id
    })

    expect(SUT.AccountList).toHaveLength(3)
    expect(SUT.Statics.sum).toBe(600)
    
})

it("should be able to return the user account statics",async()=>{
    var randomT = await transactionRepositorie.create({
        Title:faker.lorem.sentence(),
        Type:"DEP",
        accountId:mainAccount.Id,
        Value:faker.number.int({max:1000})
    })
    const SUT = await ReturnUserAccountList.execute({
        userId:createUser.Id
    })

    expect(SUT.AccountStatics[0].DepositValue).toBe(randomT.Value)

})