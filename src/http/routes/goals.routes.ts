import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { DelteGoalSchema, MarkGoalAsCompletedSchema, RegisterGoalSchema, ReturnGoalListValidated, UpdateGoalSchema, UpdateGoalValueSchema } from "../schemas/goalsSchema";
import { ReturnGoalListControler } from "../controlers/ReturnGoalList";
import { RegisterGoal } from "../controlers/RegisterGoalControler";
import { UpdateGoalValueControler } from "../controlers/UpdateGoalValue";
import { UpdateGoalControler } from "../controlers/UpdateGoalControler";
import { MarkGoalAsCompletedControler } from "../controlers/MarkGoalAsCompleted";
import { DeleteGoalControler } from "../controlers/DeleteGoalControler";

export async function  GoalsRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/create",RegisterGoalSchema,RegisterGoal)
    app.withTypeProvider<ZodTypeProvider>().get("",ReturnGoalListValidated,ReturnGoalListControler)
    app.withTypeProvider<ZodTypeProvider>().put("/value/:GoalId/:Value",UpdateGoalValueSchema,UpdateGoalValueControler)
    app.withTypeProvider<ZodTypeProvider>().put("/update/:GoalId",UpdateGoalSchema,UpdateGoalControler)
    app.withTypeProvider<ZodTypeProvider>().put("/complete/:GoalId",MarkGoalAsCompletedSchema,MarkGoalAsCompletedControler)
    app.withTypeProvider<ZodTypeProvider>().delete("/delete/:GoalId",DelteGoalSchema,DeleteGoalControler)
}