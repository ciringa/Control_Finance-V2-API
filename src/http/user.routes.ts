import { FastifyInstance } from "fastify";
import { RegisterUserControler } from "./controlers/RegisterUserControler";
import { RegisterUserSchema, ReturnAccountDataSchema } from "./schemas/userSchemas";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { ReturnAccountInfo } from "./controlers/returnUserAccountInfoControler";

export async function userRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/users/register",RegisterUserSchema,RegisterUserControler)
    app.withTypeProvider<ZodTypeProvider>().get("/users/account",ReturnAccountDataSchema,ReturnAccountInfo)
}