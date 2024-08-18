import z from "zod";
import { VerifyJWT } from "../midleware/VerifyJwt";

export const SearcSchema = {
    schema:{
        tags:["Utils"],
        description:"Route used to Search transactions, Goals and accounts by recieving an Query and Page as parameter. Returns paginated by 3 elements for each page",
        params:z.object({
            Query:z.string(),
            Page:z.string().default("1")
        }),
        response:{
            200:z.object({
                static:z.object({
                    TotalElementsReturnValue:z.number(),
                }),
                Transactions:z.array(z.object({
                    Id: z.string().uuid(),
                    Title: z.string(),
                    Value: z.number(),
                    Type:  z.enum(["DEP","SAL"]),
                    accountId:z.string().uuid(),
                    Categories:z.enum([
                        "Alimentacao", "Educacao","Laser","Saude","Eletronicos","Compras","Beleza","Veiculo","Roupas","Investimento","Salario","Comissao","Outro"
                    ]).nullable()
                })).max(3),
                Accounts:z.array(z.object({
                    Id: z.string().uuid(),
                    Name: z.string(),
                    Value: z.number(),
                    userId: z.string().uuid(),
                })).max(3),
                Goals:z.array(z.object({
                    Id:z.string().uuid(),
                    Title:z.string(),
                    Value: z.number(),
                    TargetedValue:z.number(),
                    CreatedAt:z.date(),
                    CompletedAt: z.date().nullable(),
                    EndTime:z.date(),
                    userId: z.string().uuid(),
                }))
            }),
            404:z.object({
                Description:z.string(),
            })
        }
    },
    preHandler:[VerifyJWT]
}
