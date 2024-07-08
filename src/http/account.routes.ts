import { FastifyInstance } from "fastify";
import { CreateAccountControler } from "./controlers/CreateAccountControler";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { CreateAccountSchema, DelteAccountSchema, ReturnAccountDataSchema } from "./schemas/accountSchemas";
import { ReturnAccountStatiscticControler } from "./controlers/ReturnAccountsStatisticControler";
import { DeleteAccountControler } from "./controlers/DeleteAccount";

export async function  AccountRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/account/register",CreateAccountSchema,CreateAccountControler)
    app.withTypeProvider<ZodTypeProvider>().get("/account/view/:AcId",ReturnAccountDataSchema,ReturnAccountStatiscticControler)
    app.withTypeProvider<ZodTypeProvider>().delete("/account/delete/:AcId",DelteAccountSchema,DeleteAccountControler)
}