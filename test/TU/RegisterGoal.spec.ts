
import { it,beforeEach, expect } from "vitest";

import { InMemoryGoalsRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryGoalsRepositorie";
import { InMemoryUserRepositorie } from "../../src/repositorie/inMemoryRepositories/InMemoryUserRepositorie";
import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { RegisterGoalUseCase } from "../../src/services/Goals/RegisterGoal";


var CreateUser = {
    Email:faker.internet.email(),
    Senha:faker.internet.password(),
    UsernName:faker.internet.userName()
}
var CreateGoal= {
    EndTime:faker.date.anytime(),
    Title:faker.word.sample(),
    Value:faker.number.int(),
    userId:String(randomUUID())
}
var GoalRepositorie:InMemoryGoalsRepositorie
var UserRepositorie:InMemoryUserRepositorie


beforeEach(async()=>{
    GoalRepositorie = new InMemoryGoalsRepositorie
    UserRepositorie = new InMemoryUserRepositorie

    CreateUser = {
        Email:faker.internet.email(),
        Senha:faker.internet.password(),
        UsernName:faker.internet.userName()
    }
    var user = await UserRepositorie.create(CreateUser)
    CreateGoal = {
        EndTime:faker.date.anytime(),
        Title:faker.word.sample(),
        Value:faker.number.int(),
        userId:String(user.Id)
    }
    
})

it("should be able to create a goal",async()=>{
    const SUT = new RegisterGoalUseCase(GoalRepositorie,UserRepositorie)
    const execute = await SUT.execute({data:CreateGoal})
    expect(execute.CreateGoal.Value).toBe(CreateGoal.Value)
    expect(execute.CreateGoal.Title).toBe(CreateGoal.Title)
})