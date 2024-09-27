import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { DelteGoalSchema, MarkGoalAsCompletedSchema, RegisterGoalSchema, ReturnGoalListValidated, UpdateGoalSchema, UpdateGoalValueSchema } from "../schemas/goalsSchema";
import { ReturnGoalListControler } from "../controlers/Goals/ReturnGoalList";
import { RegisterGoal } from "../controlers/Goals/RegisterGoalControler";
import { UpdateGoalValueControler } from "../controlers/Goals/UpdateGoalValue";
import { UpdateGoalControler } from "../controlers/Goals/UpdateGoalControler";
import { MarkGoalAsCompletedControler } from "../controlers/Goals/MarkGoalAsCompleted";
import { DeleteGoalControler } from "../controlers/Goals/DeleteGoalControler";

export async function  GoalsRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post("/create",RegisterGoalSchema,RegisterGoal)
    app.withTypeProvider<ZodTypeProvider>().get("",ReturnGoalListValidated,ReturnGoalListControler)
    app.withTypeProvider<ZodTypeProvider>().put("/value/:GoalId/:Value",UpdateGoalValueSchema,UpdateGoalValueControler)
    app.withTypeProvider<ZodTypeProvider>().put("/update/:GoalId",UpdateGoalSchema,UpdateGoalControler)
    app.withTypeProvider<ZodTypeProvider>().put("/complete/:GoalId",MarkGoalAsCompletedSchema,MarkGoalAsCompletedControler)
    app.withTypeProvider<ZodTypeProvider>().delete("/delete/:GoalId",DelteGoalSchema,DeleteGoalControler)
}