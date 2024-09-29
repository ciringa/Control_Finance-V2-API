import { beforeEach, expect, it } from "vitest";
import { InMemoryUserRepositorie } from "../../src/repositorie/inMemoryRepositories/InMemoryUserRepositorie";
import { InMemoryTransactionsRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryTransactionsRepositorie";
import { InMemoryAccountRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryAccountRepositorie";
import { faker } from "@faker-js/faker";
import { ReturnAllTransactionsFromUserUseCase } from "../../src/services/Transactions/returnAllUserTransactions";
import { Account, User } from "@prisma/client";

var userRepositorie:InMemoryUserRepositorie
var transactionRepositorie:InMemoryTransactionsRepositorie
var accounRepositorie:InMemoryAccountRepositorie
var SUT:ReturnAllTransactionsFromUserUseCase
var baseAccount:Account
var baseUser:User

beforeEach(async()=>{
    userRepositorie = new InMemoryUserRepositorie()
    transactionRepositorie = new InMemoryTransactionsRepositorie()
    accounRepositorie = new InMemoryAccountRepositorie()
    baseUser = await userRepositorie.create({
        Email:faker.internet.email(),
        Senha:faker.internet.password(),
        UsernName:faker.internet.userName(),
    })
    baseAccount = await accounRepositorie.create({
        Name:faker.lorem.slug(),
        userId:baseUser.Id,
        Value:faker.number.int({
            min:200,max:300
        })
    })
    for(let i = 0;i <= 22; i++){
        transactionRepositorie.create({
            accountId:baseAccount.Id,
            Title:faker.lorem.word(),
            Type:i%2==0? "DEP": "SAL",
            Value:faker.number.int({
                min:200,max:300
            }),
            Categories: i%2==0? "Salario": "Alimentacao"
        })
    }
    SUT = new ReturnAllTransactionsFromUserUseCase(userRepositorie,transactionRepositorie,accounRepositorie)
})

it("should be able to return all the transactions from an User",async () => {
    const {Id} = baseUser;
    const returnV = await SUT.execute({userId:Id})
    expect(returnV.TransactionList[0].Categories).toBe("Salario")
})