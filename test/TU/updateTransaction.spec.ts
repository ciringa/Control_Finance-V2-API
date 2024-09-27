import { beforeEach, expect, it } from "vitest";
import { InMemoryAccountRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryAccountRepositorie";
import { InMemoryTransactionsRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryTransactionsRepositorie";
import { Account, Prisma, Transaction, Type } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { CreateTransactionUseCase } from "../../src/services/Transactions/CreateTransaction";
import { CantUpdateInformedData } from "../../src/services/.Error/WrongProvidedParams";
import { UpdateTransactionUseCase } from "../../src/services/Transactions/UpdateTransaction";


const accountData:Prisma.AccountUncheckedCreateInput = {
    Name:faker.internet.userName(),
    userId:randomUUID(),
    Id:randomUUID(),
    Value:50
}
const TransactionData= {
    Title:faker.internet.displayName(),
    Type:Type.DEP,
    Value:200
}
var accountRepositorie:InMemoryAccountRepositorie
var transactionRepositorie:InMemoryTransactionsRepositorie
var createdTransaction:Transaction
var UseCase:UpdateTransactionUseCase
var account:Account
var createTransactionUseCase:CreateTransactionUseCase
beforeEach(async()=>{
    accountRepositorie = new InMemoryAccountRepositorie()
    transactionRepositorie = new InMemoryTransactionsRepositorie()
    createTransactionUseCase = new CreateTransactionUseCase(transactionRepositorie,accountRepositorie)
    account = await accountRepositorie.create(accountData)
    const {Title,Type,Value} = TransactionData
    
    var rand = await createTransactionUseCase.execute({data:{
        Title,Type,Value,accountId:account.Id
    }})
    createdTransaction = rand.Transaction

    UseCase = new UpdateTransactionUseCase(transactionRepositorie,accountRepositorie)
})
it("should be able to update a transaction",async ()=>{
    const SUT = await UseCase.execute({Id:createdTransaction.Id,data:{
        Title:"NovaTransaçao"
    }})
    console.log(SUT)
    expect(SUT.Old.Title).toBe(createdTransaction.Title)
    expect(SUT.New.Title).toBe("NovaTransaçao")
    
})
it("should be able to change the account based in the transaction",async()=>{
    const SUT = await UseCase.execute({Id:createdTransaction.Id,data:{
        Value:50
    }})
    expect(SUT.Old.Value).toBe(TransactionData.Value)
    expect(SUT.New.Value).toBe(50)
    //expect(SUT.AccountValue.Old).toBe(250)
    expect(SUT.AccountValue.New).toBe(100)

})
it("should no be able to update an unauthorized data type(Id)",async()=>{
    await expect(UseCase.execute({Id:createdTransaction.Id,data:{
        Id:"jsakhskajsk"
    }})).rejects.toBeInstanceOf(CantUpdateInformedData) 
})
it("should no be able to update an unauthorized data type(AccountId)",async()=>{
    await expect(UseCase.execute({Id:createdTransaction.Id,data:{
        accountId:"jsakhskajsk"
    }})).rejects.toBeInstanceOf(CantUpdateInformedData) 
})