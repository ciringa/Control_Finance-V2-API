import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { CreateTransaction } from "../controlers/Transactions/CreateTransaction";
import { CreateTransactionSchema, DeleteTransactionSchema, ReturnTransactionListSchema, UpdateTransactionSchema } from "../schemas/TransactionSchemas";
import { UpdateTransaction } from "../controlers/Transactions/UpdateTransactionControler";
import { ReturnTransactionList } from "../controlers/Transactions/ReturnTransactionList";
import { DeleteTransactionControler } from "../controlers/Transactions/deleteTransactionControler";

export async function TransactionRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/create",CreateTransactionSchema,CreateTransaction)
    app.withTypeProvider<ZodTypeProvider>().delete("/delete/:TrId",DeleteTransactionSchema,DeleteTransactionControler)
    app.withTypeProvider<ZodTypeProvider>().put("/update/:TrId",UpdateTransactionSchema,UpdateTransaction)
    app.withTypeProvider<ZodTypeProvider>().get("",ReturnTransactionListSchema,ReturnTransactionList)
}