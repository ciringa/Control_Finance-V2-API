import { FastifyInstance } from "fastify";
import { CreateAccountControler } from "../controlers/CreateAccountControler";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { CreateAccountSchema, DelteAccountSchema, UpdateAccountSchema, ReturnAccountDataSchema } from "../schemas/accountSchemas";
import { ReturnAccountStatiscticControler } from "../controlers/ReturnAccountsStatisticControler";
import { DeleteAccountControler } from "../controlers/DeleteAccount";
import { updateAccountNameControler } from "../controlers/updateAccountControler";

export async function  AccountRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/register",CreateAccountSchema,CreateAccountControler)
    app.withTypeProvider<ZodTypeProvider>().get("/view/:AcId",ReturnAccountDataSchema,ReturnAccountStatiscticControler)
    app.withTypeProvider<ZodTypeProvider>().delete("/delete/:AcId",DelteAccountSchema,DeleteAccountControler)
    app.withTypeProvider<ZodTypeProvider>().put("/update/:AcId",UpdateAccountSchema,updateAccountNameControler)
}