import { FastifyInstance } from "fastify";
import { CreateAccountControler } from "./controlers/CreateAccountControler";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { CreateAccountSchema } from "./schemas/accountSchemas";

export async function  AccountRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/account/register",CreateAccountSchema,CreateAccountControler)
}