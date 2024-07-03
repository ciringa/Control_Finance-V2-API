import { beforeEach, expect, it } from "vitest";
import { RegisterUserUseCase } from "../../src/services/RegisterUser";
import { InMemoryUserRepositorie } from "../../src/repositorie/inMemoryRepositories/InMemoryUserRepositorie";
import { Prisma } from "@prisma/client";
import { EmailAlreadyExists } from "../../src/services/Error/ValidationErrors";

const data:Prisma.UserCreateInput = {
    Email:"testEmail@gmail.com",
    Senha:"testPasword",
    UsernName:"TestUser"
}
var Repositorie:InMemoryUserRepositorie 
beforeEach(()=>{
    Repositorie = new InMemoryUserRepositorie()
})


it("should be able to generate an user",async()=>{
    const SUT = new RegisterUserUseCase(Repositorie)

    const createUser = await SUT.execute({
        data
    })

    expect(createUser.Data.Email).toBe(data.Email)
})

it("should be able to generate an user",async()=>{
    const SUT = new RegisterUserUseCase(Repositorie)

    const createUser = await SUT.execute({
        data
    })
    expect(createUser.Data.Email).toBe(data.Email)
    await expect(SUT.execute({data})).rejects.toBeInstanceOf(EmailAlreadyExists)
})