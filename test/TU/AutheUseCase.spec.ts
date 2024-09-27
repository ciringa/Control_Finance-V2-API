
import { beforeEach, expect,it} from "vitest";
import { InMemoryUserRepositorie } from "../../src/repositorie/inMemoryRepositories/InMemoryUserRepositorie";
import { Prisma, User } from "@prisma/client";
import { AuthUseCase } from "../../src/services/Authenticate";
import { RegisterUserUseCase } from "../../src/services/User/RegisterUser";
import { faker, Faker } from "@faker-js/faker";
import { UserDoesNotExists } from "../../src/services/.Error/MissedResourcesError";

const Userdata:Prisma.UserCreateInput = {
    Email:faker.internet.email(),
    Senha:faker.internet.password(),
    UsernName:faker.person.firstName(),

}
var UserRepositorie:InMemoryUserRepositorie 
var testUser:User
var createUserUseCase:RegisterUserUseCase
beforeEach(async()=>{
    UserRepositorie = new InMemoryUserRepositorie()
    createUserUseCase = new RegisterUserUseCase(UserRepositorie)
    testUser= (await createUserUseCase.execute({data:Userdata})).Data
})
it("should be able to login",async()=>{
    const SUT = new AuthUseCase(UserRepositorie)
    const {Email,Senha} = Userdata
    const returnLogin = await SUT.execute({Email,Senha})
    
    expect(returnLogin.id).toBe(testUser.Id)
})

it("should not be able to login as a non existing email", async()=>{
    const SUT = new AuthUseCase(UserRepositorie)
    const {Senha} = Userdata
    await expect(SUT.execute({Email:"ashajshaj",Senha})).rejects.toBeInstanceOf(UserDoesNotExists)
})