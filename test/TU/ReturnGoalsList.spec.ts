import { beforeEach,it } from "vitest";
import { InMemoryGoalsRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryGoalsRepositorie";
import { InMemoryUserRepositorie } from "../../src/repositorie/inMemoryRepositories/InMemoryUserRepositorie";
import { ReturnGoalListUseCase } from "../../src/services/ReturnGoalsList";
import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";



const UserData = {
    Email:faker.internet.email(),
    Senha:faker.internet.password(),
    UsernName:faker.internet.userName()
}
var UseCase:ReturnGoalListUseCase
var goalRepositorie:InMemoryGoalsRepositorie
var UserRepositorie:InMemoryUserRepositorie
var user:User
beforeEach(async()=>{
    goalRepositorie = new InMemoryGoalsRepositorie()
    UserRepositorie = new InMemoryUserRepositorie()
    UseCase = new ReturnGoalListUseCase(goalRepositorie,UserRepositorie)
    user = await UserRepositorie.create(UserData)
    for(let i=0;i<5;i++){
        goalRepositorie.create({
            EndTime:(i%2==0?faker.date.past():faker.date.future()),
            Title:faker.word.sample(),
            Value:faker.number.int({min:100,max:200}),
            userId:user.Id,
            TargetedValue:150,
    })
    }
    
    goalRepositorie.list[0].CompletedAt = new Date()
})

it("should be able to return goals", async()=>{
    const SUT = await UseCase.execute({UserId:user.Id})
    console.log(SUT)
})
