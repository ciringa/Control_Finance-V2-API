import { beforeEach, expect, it } from "vitest";
import { userRepositorie } from "../../src/repositorie/user.repositorie";
import { InMemoryUserRepositorie } from "../../src/repositorie/inMemoryRepositories/InMemoryUserRepositorie";
import { updateUserUseCase } from "../../src/services/User/updateUseCase";
import { faker } from "@faker-js/faker";

var repositorie:InMemoryUserRepositorie
var useCase:updateUserUseCase

const data = {
    Email:faker.internet.email(),
    Senha:faker.internet.password(),
    UsernName:faker.internet.userName(),
}
beforeEach(()=>{
    repositorie = new InMemoryUserRepositorie()
    useCase = new updateUserUseCase(repositorie)

    repositorie.create(data)
})

it("should be able to update a user",async()=>{
    const {Id} = repositorie.list[0]
    const SUT = await useCase.execute({
        data:{
            UsernName:"teste"
        },
        userId:Id
    })

    expect(SUT.UsernName).toBe("teste")
})