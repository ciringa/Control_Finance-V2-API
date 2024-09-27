import { beforeEach, expect, it } from "vitest";
import { InMemoryAccountRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryAccountRepositorie";
import { InMemoryTransactionsRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryTransactionsRepositorie";
import { Account, Prisma, Transaction, Type } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { DeleteTransactionsUseCase } from "../../src/services/Transactions/DeleteTransaction";
import { TransactionDoesNotExists } from "../../src/services/.Error/MissedResourcesError";
import { CreateTransactionUseCase } from "../../src/services/Transactions/CreateTransaction";


const accountData:Prisma.AccountUncheckedCreateInput = {
    Name:faker.internet.userName(),
    userId:randomUUID(),
    Id:randomUUID(),
    Value:Number(faker.number.int({
        min:100,max:200
    }))
}
const TransactionData= {
    Title:faker.internet.displayName(),
    Type:Type.DEP,
    Value:faker.number.int({
        min:100,max:200
    })
}
var accountRepositorie:InMemoryAccountRepositorie
var transactionRepositorie:InMemoryTransactionsRepositorie
var createdTransaction:Transaction
var UseCase:DeleteTransactionsUseCase
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

    UseCase = new DeleteTransactionsUseCase(transactionRepositorie,accountRepositorie)
})
it("should be able to delete a transaction",async ()=>{
    const SUT = await UseCase.execute({Id:createdTransaction.Id})
    expect(SUT.Transaction.Id).toBe(createdTransaction.Id)
    expect(SUT.Account.Value).toBe(accountData.Value)
    
})
it("should not be able to delete a non existing transaction",async ()=>{
    await expect(UseCase.execute({Id:"asahgsagshags"})).rejects.toBeInstanceOf(TransactionDoesNotExists)
})