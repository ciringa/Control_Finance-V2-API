import { FastifyInstance } from "fastify";
import { CreateAccountControler } from "../controlers/Account/CreateAccountControler";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { CreateAccountSchema, DelteAccountSchema, UpdateAccountSchema, ReturnAccountDataSchema } from "../schemas/accountSchemas";
import { ReturnAccountStatiscticControler } from "../controlers/Account/ReturnAccountsStatisticControler";
import { DeleteAccountControler } from "../controlers/Account/DeleteAccount";
import { updateAccountNameControler } from "../controlers/Account/updateAccountControler";

export async function  AccountRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/register",CreateAccountSchema,CreateAccountControler)
    app.withTypeProvider<ZodTypeProvider>().get("/view/:AcId",ReturnAccountDataSchema,ReturnAccountStatiscticControler)
    app.withTypeProvider<ZodTypeProvider>().delete("/delete/:AcId",DelteAccountSchema,DeleteAccountControler)
    app.withTypeProvider<ZodTypeProvider>().put("/update/:AcId",UpdateAccountSchema,updateAccountNameControler)
}