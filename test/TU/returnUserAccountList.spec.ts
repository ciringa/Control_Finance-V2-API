
import { InMemoryAccountRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryAccountRepositorie";
import { beforeEach, expect ,it} from "vitest";
import { Account, Prisma, User } from "@prisma/client";
import { returnUserAccountInfoUseCase } from "../../src/services/returnUserAccountInfo";
import { InMemoryUserRepositorie } from "../../src/repositorie/inMemoryRepositories/InMemoryUserRepositorie";
import { InMemoryTransactionsRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryTransactionsRepositorie";
import { faker } from "@faker-js/faker";
import { getRandomItem } from "../../src/utils/choose";

const UserData:Prisma.UserCreateInput = {
    Email:"testEmail@gmail.com",
    Senha:"testPasword",
    UsernName:"TestUser"
}
const AccountData = {
    Name:"Test Account",
    Value:200,
    userId:"randomUser",
    Description:faker.lorem.paragraph()
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
    
    const {Name,Value,Description} = AccountData

    mainAccount = await accountRepositorie.create({Name,Value,userId:createUser.Id,Description,Type:"Carteira"})
    var t1 = await accountRepositorie.create({Name,Value,userId:createUser.Id,Description})
    var t2 = await accountRepositorie.create({Name,Value,userId:createUser.Id,Description})
    for(let i = 0;i<22;i++){
        transactionRepositorie.create({
            accountId:i%2?t1.Id:t2.Id,
            Title:faker.lorem.word(),
            Type:getRandomItem(["DEP","SAL"]),
            Value:faker.number.int({
                min:50,max:200
            }),
            Categories:"Alimentacao",
        })
    }
    ReturnUserAccountList = new returnUserAccountInfoUseCase(UserRepositorie,accountRepositorie,transactionRepositorie)
})


it("should be able to return the user account list",async()=>{
    
    const SUT = await ReturnUserAccountList.execute({
        userId:createUser.Id
    })
    console.log(SUT);
    
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