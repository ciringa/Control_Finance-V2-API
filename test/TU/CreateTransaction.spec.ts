import { beforeEach, expect, it } from "vitest";
import { CreateTransactionUseCase } from "../../src/services/CreateTransaction";
import { Account, Type } from "@prisma/client";
import { InMemoryAccountRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryAccountRepositorie";
import { InMemoryTransactionsRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryTransactionsRepositorie";
import { AccountDoesNotExists } from "../../src/services/Error/MissedResourcesError";


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