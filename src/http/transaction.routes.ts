import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { CreateTransaction } from "./controlers/CreateTransaction";
import { CreateTransactionSchema, DeleteTransactionSchema } from "./schemas/TransactionSchemas";
import { DeleteTransactionControler } from "./controlers/deleteTransactionControler";

export async function TransactionRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/create",CreateTransactionSchema,CreateTransaction)
    app.withTypeProvider<ZodTypeProvider>().delete("/delete",DeleteTransactionSchema,DeleteTransactionControler)
}