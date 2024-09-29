import z from "zod";

export const AccountZodSchema = z.object({
        Id: z.string().uuid(),
        Name: z.string(),
        Value: z.number(),
        userId: z.string().uuid(),
        Type:z.enum(["Carteira","Poupanca","ContaBancaria","CorretoraDeInvestimentos"]),
        Description:z.string().optional(),
})