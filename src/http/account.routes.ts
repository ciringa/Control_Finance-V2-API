import { FastifyInstance } from "fastify";
import { CreateAccountControler } from "./controlers/CreateAccountControler";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { CreateAccountSchema, ReturnAccountDataSchema } from "./schemas/accountSchemas";
import { ReturnAccountStatiscticControler } from "./controlers/ReturnAccountsStatisticControler";

export async function  AccountRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/account/register",CreateAccountSchema,CreateAccountControler)
    app.withTypeProvider<ZodTypeProvider>().get("/account/view/:AcId",ReturnAccountDataSchema,ReturnAccountStatiscticControler)
}