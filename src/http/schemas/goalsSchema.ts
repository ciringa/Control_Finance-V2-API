
import z from "zod";
import { VerifyJWT } from "../midleware/VerifyJwt";
import { GoalsZodSchema } from "../../dtos/zod/Goals";


export const RegisterGoalSchema = {
    schema:{
        tags:["Goals"],
        description:"Route used to register Goals, Requires A jwt token",
        body:z.object({
            EndTime:z.string(),
            Title:z.string(),
            TargetedValue:z.number().optional(),
            Value:z.number().optional(),
        }),
        response:{
            201:z.object({
                CreatedGoal:GoalsZodSchema
            }),
            400:z.object({
                Description:z.string()
            })
        }
    },preHandler:[VerifyJWT]
}


export const MarkGoalAsCompletedSchema = {
    schema:{
        tags:["Goals"],
        description:"Route used to mark a Goal as completed, Requires A jwt token",
        params:z.object({
            GoalId:z.string().uuid()
        }),
        response:{
            200:z.object({
                CompletedAt:z.date().nullable(),
                CreatedAt:z.date()
            }),
            400:z.object({
                Description:z.string()
            })
        }
    },preHandler:[VerifyJWT]
}
export const UpdateGoalValueSchema = {
    schema:{
        tags:["Goals"],
        description:"Route used to update the current Goal value by providing a GoalId, the provided value can only be positive, Requires A jwt token",
        params:z.object({
            GoalId:z.string(),
            Value:z.string(),
        }),
        response:{
            200:z.object({
                updatedGoal:GoalsZodSchema.nullable(),
                OldGoal:GoalsZodSchema
            }),
            400:z.object({
                Description:z.string()
            })
        }
    },preHandler:[VerifyJWT]
}
export const UpdateGoalSchema = {
    schema:{
        tags:["Goals"],
        description:"Route used to update the current Goal by providing a GoalId, Requires A jwt token",
        params:z.object({
            GoalId:z.string(),
        }),
        body:z.object({
            Title:z.string().optional(),
            Value: z.number().optional(),
            TargetedValue:z.number().optional(),
            EndTime:z.string().optional(),
        }),
        response:{
            200:z.object({
                updatedGoal:GoalsZodSchema.nullable(),
                OldGoal:GoalsZodSchema
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
            200:z.object({
                unCompletedGoals:z.array(GoalsZodSchema.nullable()),
                ExpiredGoals:z.array(GoalsZodSchema.nullable()),
                CompletedGoals:z.array(GoalsZodSchema.nullable()),
            }),
            400:z.object({
                Description:z.string()
            })
        }
    },preHandler:[VerifyJWT]
}


export const DelteGoalSchema = {
    schema:{
        tags:["Goals"],
        description:"Route Used to delete the goal. needs a JWT token Authentication",
        params:z.object({
            GoalId:z.string().uuid()
        }),
        response:{
            400:z.object({
                Description:z.string(),
            })
        }
    },
    preHandler:[VerifyJWT]
}