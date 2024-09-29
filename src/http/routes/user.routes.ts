import { FastifyInstance } from "fastify";
import { RegisterUserSchema, ReturnAccountDataSchema, ReturnAccountStatistic, updateUserSchema, UserDeleteSchema, UserResetSchema } from "../schemas/userSchemas";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { ReturnAccountInfo } from "../controlers/User/returnUserAccountInfoControler";
import { ReturnStatisticControler } from "../controlers/Info/ReturnStatisticsControler";
import { DeleteUserControler } from "../controlers/User/DeleteUserAccount";
import { ResetUserAccountControler } from "../controlers/User/ResetUserAccountControler";
import { RegisterUserControler } from "../controlers/User/RegisterUserControler";
import { updateUserController } from "../controlers/User/updateUse";


export async function userRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/register",RegisterUserSchema,RegisterUserControler)
    app.withTypeProvider<ZodTypeProvider>().get("/account",ReturnAccountDataSchema,ReturnAccountInfo)
    app.withTypeProvider<ZodTypeProvider>().get("/statistic",ReturnAccountStatistic,ReturnStatisticControler)
    app.withTypeProvider<ZodTypeProvider>().delete("/delete",UserDeleteSchema,DeleteUserControler)
    app.withTypeProvider<ZodTypeProvider>().delete("/reset",UserResetSchema,ResetUserAccountControler)
    app.withTypeProvider<ZodTypeProvider>().put("/update",updateUserSchema,updateUserController)
}