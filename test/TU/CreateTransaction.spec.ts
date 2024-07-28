import { beforeEach, expect, it } from "vitest";
import { CreateTransactionUseCase } from "../../src/services/CreateTransaction";
import { Account, Type } from "@prisma/client";
import { InMemoryAccountRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryAccountRepositorie";
import { InMemoryTransactionsRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryTransactionsRepositorie";
import { AccountDoesNotExists } from "../../src/services/Error/MissedResourcesError";
import { InvalidTagProvidedToTransactionType } from "../../src/services/Error/WrongProvidedParams";


var accountRepositorie:InMemoryAccountRepositorie
var transactionRepositorie:InMemoryTransactionsRepositorie
var createTransactionUseCase:CreateTransactionUseCase
var createdAccount:Account

beforeEach(async()=>{
    accountRepositorie = new InMemoryAccountRepositorie()
    transactionRepositorie = new InMemoryTransactionsRepositorie()

    createdAccount = {Name:"testName",userId:"randomUserId",Id:"randomId",Value:300}
    accountRepositorie.list.push(createdAccount)
    createTransactionUseCase = new CreateTransactionUseCase(transactionRepositorie,accountRepositorie)
})

it("should be able to create a Transaction",async()=>{
    const {Id} = createdAccount
    const SUT = await createTransactionUseCase.execute({
        data:{
            accountId:Id,Title:"randomTransaction",Type:Type.DEP,Value:240,
        }
    })
    expect(SUT.Transaction.Type).toBe("DEP")
    expect(SUT.Transaction.accountId).toBe(Id)
    expect(SUT.Transaction.Title).toBe("randomTransaction")
})

it("should not be able to create a Transaction in a non existing Account",async()=>{
    await expect(createTransactionUseCase.execute({
        data:{
            accountId:"h",Title:"randomTransaction",Type:Type.DEP,Value:240,
        }
    })).rejects.toBeInstanceOf(AccountDoesNotExists)
})

it("should be able to update the value of the account based in the transaction",async()=>{
    const {Id} = createdAccount
    const SUT = await createTransactionUseCase.execute({
        data:{
            accountId:Id,Title:"randomTransaction",Type:Type.DEP,Value:240,
        }
    })
    expect(SUT.Account.Value).toBe(540)
    expect(SUT.Account.Id).toBe(createdAccount.Id)
})

it("should be able to update the value based in transaction type",async()=>{
    const {Id} = createdAccount
    const SUT = await createTransactionUseCase.execute({
        data:{
            accountId:Id,Title:"randomTransaction",Type:Type.DEP,Value:240,
        }
    })
    expect(SUT.Account.Value).toBe(540)
    expect(SUT.Account.Id).toBe(createdAccount.Id)

    const second = await createTransactionUseCase.execute({
        data:{
            accountId:Id,Title:"randomTransaction",Type:Type.SAL,Value:80,
        }
    })
    expect(second.Account.Value).toBe(460)
    expect(second.Account.Id).toBe(createdAccount.Id)
})

it("should be able to categorize a transaction",async()=>{
    const {Id} = createdAccount
    const SUT = await createTransactionUseCase.execute({
        data:{
            accountId:Id,Title:"randomTransaction",Type:Type.DEP,Value:240,Categories:"Comissao"
        }
    })

    expect(SUT.Transaction.Categories).toBe("Comissao")
})

it("should not be able to categorize a transaction in a diferente type",async()=>{
    const {Id} = createdAccount
    //From SAL TYpe
    await expect(createTransactionUseCase.execute({
        data:{
            accountId:Id,Title:"randomTransaction",Type:Type.SAL,Value:240,Categories:"Comissao"
        }
    })).rejects.toBeInstanceOf(InvalidTagProvidedToTransactionType)
    //From DEP type
    await expect(createTransactionUseCase.execute({
        data:{
            accountId:Id,Title:"randomTransaction",Type:Type.DEP,Value:240,Categories:"Beleza"
        }
    })).rejects.toBeInstanceOf(InvalidTagProvidedToTransactionType)

})