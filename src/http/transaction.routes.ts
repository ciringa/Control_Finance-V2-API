import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { CreateTransaction } from "./controlers/CreateTransaction";
import { CreateTransactionSchema, DeleteTransactionSchema, ReturnTransactionListSchema, UpdateTransactionSchema } from "./schemas/TransactionSchemas";
import { DeleteTransactionControler } from "./controlers/deleteTransactionControler";
import { UpdateTransaction } from "./controlers/UpdateTransactionControler";
import { ReturnTransactionList } from "./controlers/ReturnTransactionList";

export async function TransactionRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/create",CreateTransactionSchema,CreateTransaction)
    app.withTypeProvider<ZodTypeProvider>().delete("/delete/:TrId",DeleteTransactionSchema,DeleteTransactionControler)
    app.withTypeProvider<ZodTypeProvider>().put("/update/:TrId",UpdateTransactionSchema,UpdateTransaction)
    app.withTypeProvider<ZodTypeProvider>().get("",ReturnTransactionListSchema,ReturnTransactionList)
}