
import z from "zod";
import { VerifyJWT } from "../midleware/VerifyJwt";


export const RegisterGoalSchema = {
    schema:{
        tags:["Goals"],
        description:"Route used to register Goals, Requires A jwt token",
        body:z.object({
            EndTime:z.date(),
            Title:z.string(),
            Value:z.number().optional(),
        }),
        response:{
            201:z.object({
                CreatedGoal:z.object({
                    Id:z.string().uuid(),
                    Title:z.string(),
                    Value: z.number(),
                    CreatedAt:z.date(),
                    CompletedAt: z.date(),
                    EndTime:z.date(),
                    userId: z.string().uuid(),
                })
            })
        }
    },preHandler:[VerifyJWT]
}