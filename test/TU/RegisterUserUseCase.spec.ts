import { beforeEach, expect, it } from "vitest";
import { RegisterUserUseCase } from "../../src/services/RegisterUser";
import { InMemoryUserRepositorie } from "../../src/repositorie/inMemoryRepositories/InMemoryUserRepositorie";
import { Prisma } from "@prisma/client";
import { EmailAlreadyExists } from "../../src/services/Error/ValidationErrors";
import { compare } from "bcryptjs";

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

it("should not be able to generate an user with an already existing email ",async()=>{
    const SUT = new RegisterUserUseCase(Repositorie)

    const createUser = await SUT.execute({
        data
    })
    expect(createUser.Data.Email).toBe(data.Email)
    await expect(SUT.execute({data})).rejects.toBeInstanceOf(EmailAlreadyExists)
})

it("should be able to hash an user password ",async()=>{
    const SUT = new RegisterUserUseCase(Repositorie)

    const createUser = await SUT.execute({
        data
    })
    const doesThePasswordIsHashed = await compare(data.Senha,createUser.Data.Senha)
    expect(doesThePasswordIsHashed).toBe(true)

})