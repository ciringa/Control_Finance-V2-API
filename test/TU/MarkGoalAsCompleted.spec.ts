import { beforeEach, it } from "vitest";
import { MarkGoalAsCompletedUseCase } from "../../src/services/MarkGoalAsCompleted";
import { InMemoryGoalsRepositorie } from "../../src/repositorie/inMemoryRepositories/inMemoryGoalsRepositorie";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { Goals } from "@prisma/client";
var CreateGoal= {
    EndTime:faker.date.anytime(),
    Title:faker.word.sample(),
    Value:faker.number.int(),
    userId:String(randomUUID())
}

var goalRepositorie:InMemoryGoalsRepositorie
var goal:Goals
beforeEach(async()=>{
    goalRepositorie = new InMemoryGoalsRepositorie()
    goal = await goalRepositorie.create(CreateGoal)
})

it("shoudl be abke to mark a goal as completed", async()=>{
    const UseCase = new MarkGoalAsCompletedUseCase(goalRepositorie)    
    const SUT = await UseCase.execute({
        GoalId:goal.Id
    })

})