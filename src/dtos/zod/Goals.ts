import z from "zod";

export const GoalsZodSchema = z.object({
    Id:z.string().uuid(),
    Title:z.string(),
    Value: z.number(),
    TargetedValue:z.number(),
    CreatedAt:z.date(),
    CompletedAt: z.date().nullable(),
    EndTime:z.date(),
    userId: z.string().uuid(),
})