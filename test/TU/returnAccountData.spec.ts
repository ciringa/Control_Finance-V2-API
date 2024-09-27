import { expect, it,beforeEach} from "vitest";
import { InMemoryAccountRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryAccountRepositorie";
import { InMemoryTransactionsRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryTransactionsRepositorie";
import { returnAccountDataUseCase } from "../../src/services/Account/ReturnAccountData";
import { Account, Type } from "@prisma/client";

const data = {
    Name:"Test Account",
    Value:200,
    userId:"randomUser"
}

var accountRepositorie:InMemoryAccountRepositorie
var transactionRepositorie:InMemoryTransactionsRepositorie
var ReturnDataUseCase:returnAccountDataUseCase
var createdAccount:Account
beforeEach(async()=>{
    accountRepositorie = new InMemoryAccountRepositorie()
    transactionRepositorie = new InMemoryTransactionsRepositorie()

    createdAccount = await accountRepositorie.create(data)
    const {Id}=createdAccount
    await transactionRepositorie.create({accountId:Id,Title:"randomTransaction",Type:Type.DEP,Value:240,})
    await transactionRepositorie.create({accountId:Id,Title:"randomTransaction",Type:Type.SAL,Value:35,})
    await transactionRepositorie.create({accountId:Id,Title:"randomTransaction",Type:Type.DEP,Value:5,}) 

    ReturnDataUseCase = new returnAccountDataUseCase(accountRepositorie,transactionRepositorie)
})


it("should be able to return an account data",async()=>{
    const {Id}=createdAccount
    const SUT = await ReturnDataUseCase.execute({Id})
    expect(SUT.Account.Id).toBe(Id)
    expect(SUT.statistic.Total).toBe(200)
    expect(SUT.statistic.Deposit).toBe(245)
    expect(SUT.statistic.Withdraw).toBe(35)
})