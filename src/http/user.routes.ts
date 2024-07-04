import { FastifyInstance } from "fastify";
import { RegisterUserControler } from "./controlers/RegisterUserControler";
import { RegisterUserSchema } from "./schemas/userSchemas";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

export async function userRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/users/register",RegisterUserSchema,RegisterUserControler)
}