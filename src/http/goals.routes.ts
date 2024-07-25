import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { RegisterGoalSchema, ReturnGoalListValidated, UpdateGoalValueSchema } from "./schemas/goalsSchema";
import { ReturnGoalListControler } from "./controlers/ReturnGoalList";
import { RegisterGoal } from "./controlers/RegisterGoalControler";
import { UpdateGoalValueControler } from "./controlers/UpdateGoalValue";

export async function  GoalsRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/create",RegisterGoalSchema,RegisterGoal)
    app.withTypeProvider<ZodTypeProvider>().get("/",ReturnGoalListValidated,ReturnGoalListControler)
    app.withTypeProvider<ZodTypeProvider>().put("/value/:GoalId/:Value",UpdateGoalValueSchema,UpdateGoalValueControler)
}