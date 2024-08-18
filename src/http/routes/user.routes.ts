import { FastifyInstance } from "fastify";
import { RegisterUserControler } from "../controlers/RegisterUserControler";
import { RegisterUserSchema, ReturnAccountDataSchema, ReturnAccountStatistic } from "../schemas/userSchemas";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { ReturnAccountInfo } from "../controlers/returnUserAccountInfoControler";
import { ReturnStatisticControler } from "../controlers/ReturnStatisticsControler";

export async function userRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/register",RegisterUserSchema,RegisterUserControler)
    app.withTypeProvider<ZodTypeProvider>().get("/account",ReturnAccountDataSchema,ReturnAccountInfo)
    app.withTypeProvider<ZodTypeProvider>().get("/statistic",ReturnAccountStatistic,ReturnStatisticControler)
}