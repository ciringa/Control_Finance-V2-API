import { beforeEach, expect, it } from "vitest";
import { InMemoryUserRepositorie } from "../../src/repositorie/inMemoryRepositories/InMemoryUserRepositorie";
import { Prisma, User } from "@prisma/client";
import { ProfileUseCase } from "../../src/services/User/profile";
import { create } from "domain";

const data:Prisma.UserCreateInput = {
    Email:"testEmail@gmail.com",
    Senha:"testPasword",
    UsernName:"TestUser",
}
var Repositorie:InMemoryUserRepositorie 
var createdUser:User
beforeEach(async()=>{
    Repositorie = new InMemoryUserRepositorie()
    createdUser = await Repositorie.create(data)
})
it("should be able to recieve the profile by providing the ID",async()=>{
    const SUT = new ProfileUseCase(Repositorie)
    const returnProfile = await SUT.execute({Id:createdUser.Id})
    expect(returnProfile.Profile.Email).toBe(data.Email)
})