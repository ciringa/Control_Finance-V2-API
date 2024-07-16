
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
            }),
            400:z.object({
                Description:z.string()
            })
        }
    },preHandler:[VerifyJWT]
}

export const ReturnGoalListValidated = {
    schema:{
        tags:["Goals"],
        description:"returns goals in 3 categories, expired (goals that can no longer be completed because they have expired), completed (routes that have already been completed) and ongoing. Requires A jwt token with user auth ",
        response:{
            201:z.object({
                unCompletedGoals:z.array(z.object({
                    Id:z.string().uuid(),
                    Title:z.string(),
                    Value: z.number(),
                    CreatedAt:z.date(),
                    CompletedAt: z.date(),
                    EndTime:z.date(),
                    userId: z.string().uuid(),
                    TargetedValue:z.string().nullable()
                })),
                ExpiredGoals:z.array(z.object({
                    Id:z.string().uuid(),
                    Title:z.string(),
                    Value: z.number(),
                    CreatedAt:z.date(),
                    CompletedAt: z.date(),
                    EndTime:z.date(),
                    userId: z.string().uuid(),
                    TargetedValue:z.string().nullable()
                })),
                CompletedGoals:z.array(z.object({
                    Id:z.string().uuid(),
                    Title:z.string(),
                    Value: z.number(),
                    CreatedAt:z.date(),
                    CompletedAt: z.date(),
                    EndTime:z.date(),
                    userId: z.string().uuid(),
                    TargetedValue:z.string().nullable()
                })),
            }),
            400:z.object({
                Description:z.string()
            })
        }
    },preHandler:[VerifyJWT]
}