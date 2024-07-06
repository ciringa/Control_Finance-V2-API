import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { CreateTransaction } from "./controlers/CreateTransaction";
import { TransactionSchema } from "./schemas/TransactionSchemas";

export async function TransactionRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/transaction/create",TransactionSchema,CreateTransaction)
}