import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUserUseCase } from "../../services/RegisterUser";
import { PrismaUsersRepositorie } from "../../repositorie/PrismaRepositories/PrismaUserRepositorie";
import { EmailAlreadyExists } from "../../services/Error/ValidationErrors";
import z from "zod";

export async function RegisterUserControler(req:FastifyRequest,res:FastifyReply){
    const Main = new RegisterUserUseCase(new PrismaUsersRepositorie())
    
    const bodySchema = z.object({
        Email:z.string().email(),
        Senha: z.string(),
        UsernName: z.string(),
    })
    const data = bodySchema.parse(req.body)

    try{
        const createdObject = await Main.execute({
            data
        })
        res.status(201).send({
            Description:"User registered"
        })
    }catch(err){
        if(err instanceof EmailAlreadyExists){
            res.status(401).send({
                Description:"Email is Already in use"
            })
        }
    }
}