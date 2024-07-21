import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { RegisterGoalSchema, ReturnGoalListValidated } from "./schemas/goalsSchema";
import { ReturnGoalListControler } from "./controlers/ReturnGoalList";
import { RegisterGoal } from "./controlers/RegisterGoalControler";

export async function  GoalsRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/create",RegisterGoalSchema,RegisterGoal)
    app.withTypeProvider<ZodTypeProvider>().get("/",ReturnGoalListValidated,ReturnGoalListControler)
}