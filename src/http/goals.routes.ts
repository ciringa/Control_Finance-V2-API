import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { RegisterUserControler } from "./controlers/RegisterUserControler";
import { RegisterGoalSchema } from "./schemas/goalsSchema";

export async function  GoalsRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/create",RegisterGoalSchema,RegisterUserControler)
}