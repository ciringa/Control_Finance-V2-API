import { FastifyInstance } from "fastify";
import { RegisterUserControler } from "../controlers/RegisterUserControler";
import { RegisterUserSchema, ReturnAccountDataSchema, ReturnAccountStatistic, UserDeleteSchema, UserResetSchema } from "../schemas/userSchemas";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ReturnAccountInfo } from "../controlers/returnUserAccountInfoControler";
import { ReturnStatisticControler } from "../controlers/ReturnStatisticsControler";
import { DeleteUserControler } from "../controlers/DeleteUserAccount";
import { ResetUserAccountControler } from "../controlers/ResetUserAccountControler";

export async function userRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/register",RegisterUserSchema,RegisterUserControler)
    app.withTypeProvider<ZodTypeProvider>().get("/account",ReturnAccountDataSchema,ReturnAccountInfo)
    app.withTypeProvider<ZodTypeProvider>().get("/statistic",ReturnAccountStatistic,ReturnStatisticControler)
    app.withTypeProvider<ZodTypeProvider>().delete("/delete",UserDeleteSchema,DeleteUserControler)
    app.withTypeProvider<ZodTypeProvider>().delete("/reset",UserResetSchema,ResetUserAccountControler)
}