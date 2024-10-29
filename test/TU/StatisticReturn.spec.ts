import { beforeEach, describe, expect, it, vi } from "vitest";
import { userRepositorie } from "../../src/repositorie/user.repositorie";
import { AccountRepositorie } from "../../src/repositorie/account.repositorie";
import { TransactionsRepositorie } from "../../src/repositorie/transactions.repositorie";
import { InMemoryUserRepositorie } from "../../src/repositorie/inMemoryRepositories/InMemoryUserRepositorie";
import { InMemoryAccountRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryAccountRepositorie";
import { InMemoryTransactionsRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryTransactionsRepositorie";
import { Account, Prisma, Transaction, User } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { getRandomItem } from "../../src/utils/choose";
import { AccountStatistcsUseCase } from "../../src/services/Analytics/AccountStatistics";
import { goalsRepositorie } from "../../src/repositorie/goals.repositorie";
import { InMemoryGoalsRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryGoalsRepositorie";
import { Status } from "../../src/utils/ReturnUserOpnionList";
import { date } from "zod";
import { now } from "lodash";

var UserRepositorie: userRepositorie;
var accountRepositorie: AccountRepositorie;
var transactionRepositorie: TransactionsRepositorie;
var GoalsRepositorie: goalsRepositorie;
var user: User;
var account: Account[];
var transactions: Transaction[];

var sut: AccountStatistcsUseCase;
beforeEach(async () => {
  UserRepositorie = new InMemoryUserRepositorie();
  accountRepositorie = new InMemoryAccountRepositorie();
  transactionRepositorie = new InMemoryTransactionsRepositorie();
  GoalsRepositorie = new InMemoryGoalsRepositorie();
  account = new Array();
  transactions = new Array();

  user = await UserRepositorie.create({
    Email: faker.internet.email(),
    Senha: faker.internet.password(),
    UsernName: faker.internet.userName(),
  });
  let p1 = await accountRepositorie.create({
    Name: faker.lorem.word(),
    userId: user.Id,
    Value: faker.number.int({ min: 0, max: 200 }),
  });
  let p2 = await await accountRepositorie.create({
    Name: faker.lorem.word(),
    userId: user.Id,
    Value: faker.number.int({ min: 0, max: 200 }),
  });
  account.push(p1);
  account.push(p2);

  sut = new AccountStatistcsUseCase(
    UserRepositorie,
    accountRepositorie,
    transactionRepositorie,
    GoalsRepositorie
  );
});
describe("test if the statistics are returning rigthfully", () => {
  it("should be able to return account statistics ", async () => {
    //ta mal otimizado mas fodase
    for (let i = 0; i <= 22; i++) {
      transactions[i] = await transactionRepositorie.create({
        accountId: i % 2 ? account[0].Id : account[1].Id,
        Title: faker.lorem.word(),
        Type: i % 2 ? "DEP" : "SAL",
        Value: faker.number.int({
          max: 100,
          min: 50,
        }),
        Categories:
          i % 2
            ? getRandomItem(["Investimento", "Salario", "Comissao"])
            : getRandomItem(["Eletronicos", "Alimentacao", "Roupas"]),
      });
    }
    const userId = user.Id;
    const returned = await sut.execute({ userId });
    expect(returned.Data.TotalAccountTransactions).toBe(23);
  });
});

describe("should be able to evaluate the user", async () => {
  it("should be able to return account evaluation if good", async () => {
    //goals creation
    for (let i = 0; i < 10; i++) {
      GoalsRepositorie.create({
        EndTime: faker.date.future(),
        Title: faker.lorem.word(),
        userId: user.Id,
        CreatedAt: new Date(),
        TargetedValue: faker.number.int({ min: 100, max: 200 }),
        Value: faker.number.int({ min: 50, max: 250 }),
        CompletedAt: new Date(),
      });
    }
    //ta mal otimizado mas fodase
    for (let i = 0; i <= 22; i++) {
      transactions[i] = await transactionRepositorie.create({
        accountId: i % 2 ? account[0].Id : account[1].Id,
        Title: faker.lorem.word(),
        Type: i % 2 ? "DEP" : "SAL",
        Value: faker.number.int({
          max: 100,
          min: 50,
        }),
        Categories:
          i % 2
            ? getRandomItem(["Investimento", "Salario", "Comissao"])
            : "Alimentacao",
      });
    }
    const userId = user.Id;
    const returned = await sut.execute({ userId });
    //console.log(returned.AccountState.AndamentoDasMetas)
    expect(returned.AccountState.AndamentoDasMetas).toEqual(Status.Good);
    expect(returned.AccountState.GastosEssenciais).toEqual(Status.Good);
  });
  it("should be able to return account evaluation if normal", async () => {
    //goals creation
    for (let i = 0; i < 10; i++) {
      GoalsRepositorie.create({
        EndTime: faker.date.future(),
        Title: faker.lorem.word(),
        userId: user.Id,
        CreatedAt: new Date(),
        TargetedValue: faker.number.int({ min: 100, max: 200 }),
        Value: faker.number.int({ min: 50, max: 250 }),
        CompletedAt: i % 2 == 0 ? new Date() : null,
      });
    }
    //transaction creation
    //ta mal otimizado mas fodase
    for (let i = 0; i <= 22; i++) {
      transactions[i] = await transactionRepositorie.create({
        accountId: i % 2 ? account[0].Id : account[1].Id,
        Title: faker.lorem.word(),
        Type: i % 2 ? "DEP" : "SAL",
        Value: faker.number.int({
          max: 100,
          min: 50,
        }),
        Categories:
          i > 9
            ? getRandomItem(["Educacao", "Saude", "Alimentacao"])
            : "Beleza",
      });
    }
    const userId = user.Id;
    const returned = await sut.execute({ userId });
    //console.log(returned.AccountState.AndamentoDasMetas)
    expect(returned.AccountState.AndamentoDasMetas).toEqual(Status.Ok);
    expect(returned.AccountState.GastosEssenciais).toEqual(Status.Ok);
  });
  it("should be able to return account evaluation if bad", async () => {
    //goals creation
    for (let i = 0; i < 10; i++) {
      GoalsRepositorie.create({
        EndTime: faker.date.future(),
        Title: faker.lorem.word(),
        userId: user.Id,
        CreatedAt: new Date(),
        TargetedValue: faker.number.int({ min: 100, max: 200 }),
        Value: faker.number.int({ min: 50, max: 250 }),
        CompletedAt: null,
      });
    }
    //ta mal otimizado mas fodase
    for (let i = 0; i <= 22; i++) {
      transactions[i] = await transactionRepositorie.create({
        accountId: i % 2 ? account[0].Id : account[1].Id,
        Title: faker.lorem.word(),
        Type: i % 2 ? "DEP" : "SAL",
        Value: faker.number.int({
          max: 100,
          min: 50,
        }),
        Categories:
          i % 2 ? "Salario" : getRandomItem(["Beleza", "Eletronicos"]),
      });
    }
    const userId = user.Id;
    const returned = await sut.execute({ userId });
    //console.log(returned.AccountState.AndamentoDasMetas)
    expect(returned.AccountState.AndamentoDasMetas).toEqual(Status.Danger);
    expect(returned.AccountState.GastosEssenciais).toEqual(Status.Danger);
    });
  // it("should be able to separate between months",async()=>{
  //    //ta mal otimizado mas fodase
  //    for (let i = 0; i <= 22; i++) {
  //     transactions[i] = await transactionRepositorie.create({
  //       accountId: i % 2 ? account[0].Id : account[1].Id,
  //       Title: faker.lorem.word(),
  //       Type: i % 2 ? "DEP" : "SAL",
  //       Value: faker.number.int({
  //         max: 100,
  //         min: 50,
  //       }),
  //       Categories:
  //         i % 2 ? "Salario" : getRandomItem(["Beleza", "Eletronicos"]),
  //       CreatedAt:faker.date.past({
  //         years:4,
  //         refDate:new Date()
  //       })
  //     });
  //   }
  //   const data:Prisma.TransactionUncheckedCreateInput = {
  //     accountId: String(account[0].Id),
  //     Title: "Transaçao criada hoje",
  //     Type:"DEP",
  //     Value: 5000,
  //     Categories:"Salario" ,
  //     CreatedAt:new Date(),
  //   }
  //   transactions[transactions.length] = await transactionRepositorie.create(data);
  //   const userId = user.Id;
  //   const returned = await sut.execute({ userId });
  //   console.log(returned.TransactionsByDate)
  //   const datetime = data.CreatedAt instanceof String?new Date(data.CreatedAt):data.CreatedAt;
  //   expect(returned.TransactionsByDate[`${datetime?.toString()}`][0].Title).toBe(data.Title)
  // })
})
