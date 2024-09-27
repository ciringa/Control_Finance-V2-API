import z, { string } from "zod";
import { VerifyJWT } from "../midleware/VerifyJwt";

export const CreateTransactionSchema = {
    schema:{
        tags:["Transaction"],
        description:"Route Used to create Transactions.Checks if the current Logged user is owner of the refered <Account>. needs a JWT token Authentication",
        body:z.object({
            Title: z.string(),
            Value: z.number(),
            CreatedAt:z.date().optional(),
            Type:  z.enum(["DEP","SAL"]),
            accountId:z.string().uuid(),
            Categories:z.enum([
                "Alimentacao", "Educacao","Laser","Saude","Eletronicos","Compras","Beleza","Veiculo","Roupas","Investimento","Salario","Comissao","Outro"
            ]).optional()
        }),
        response:{
            201:z.object({
                Description:z.string(),
                Transaction:z.object({
                    Id: z.string().uuid(),
                    Title: z.string(),
                    Value: z.number(),
                    Type:  z.enum(["DEP","SAL"]),
                    accountId:z.string().uuid(),
                    CreatedAt:z.date(),
                    Categories:z.enum([
                        "Alimentacao", "Educacao","Laser","Saude","Eletronicos","Compras","Beleza","Veiculo","Roupas","Investimento","Salario","Comissao","Outro"
                    ]).nullable()
                })
            }),
            404:z.string(),
            401:z.string()
        }
    },
    preHandler:[VerifyJWT]
}


export const DeleteTransactionSchema = {
    schema:{
        tags:["Transaction"],
        description:"Route Used to delete Transactions.Checks if the current Logged user is owner of the refered <Account>. needs a JWT token Authentication",
        params:z.object({
            TrId:z.string().uuid()
        }),
        response:{
            201:z.object({
                Transaction:z.object({
                    Id: z.string().uuid(),
                    Title: z.string(),
                    Value: z.number(),
                    Type:  z.enum(["DEP","SAL"]),
                    accountId:z.string().uuid(),
                    CreatedAt:z.date(),
                    Categories:z.enum([
                        "Alimentacao", "Educacao","Laser","Saude","Eletronicos","Compras","Beleza","Veiculo","Roupas","Investimento","Salario","Comissao","Outro"
                    ]).nullable()
                }),
                Account:z.object({
                    Value:z.number(),
                    Id:z.string().uuid()
                })
            }),
            404:z.object({
                Description:z.string(),
            })
        }
    },
    preHandler:[VerifyJWT]
}

export const UpdateTransactionSchema = {
    schema:{
        tags:["Transaction"],
        description:"Route Used to update Transactions values.Checks if the current Logged user is owner of the refered <Account>. needs a JWT token Authentication",
        body:z.object({
            Title:  z.string().optional(),
            Value:z.number().optional(),
            Type: z.enum(["DEP","SAL"]).optional(),
            Categories:z.enum([
                "Alimentacao", "Educacao","Laser","Saude","Eletronicos","Compras","Beleza","Veiculo","Roupas","Investimento","Salario","Comissao","Outro"
            ]).optional()
        }),
        paramm:z.object({
            TrId:z.string().uuid()
        }),
        response:{
            200:z.object({
                Old:z.object({
                    Id: z.string().uuid(),
                    Title: z.string(),
                    Value: z.number(),
                    Type:  z.enum(["DEP","SAL"]),
                    accountId:z.string().uuid(),
                    CreatedAt:z.date(),
                    Categories:z.enum([
                        "Alimentacao", "Educacao","Laser","Saude","Eletronicos","Compras","Beleza","Veiculo","Roupas","Investimento","Salario","Comissao","Outro"
                    ]).nullable()
                }),
                New:z.object({
                    Id: z.string().uuid(),
                    Title: z.string(),
                    Value: z.number(),
                    Type:  z.enum(["DEP","SAL"]),
                    accountId:z.string().uuid(),
                    CreatedAt:z.date(),
                    Categories:z.enum([
                        "Alimentacao", "Educacao","Laser","Saude","Eletronicos","Compras","Beleza","Veiculo","Roupas","Investimento","Salario","Comissao","Outro"
                    ]).nullable()
                }),
                AccountValue:z.object({
                    Old:z.number(),
                    New:z.number()
                })
            }),
            400:z.object({
                Description:z.string(),
            })
        }
    },
    preHandler:[VerifyJWT]
}

export const ReturnTransactionListSchema = {
    schema:{
        tags:["Transaction"],
        description:"Route Used to return the Transactions List of an User.Checks if the current Logged user is owner of the refered <Account>. needs a JWT token Authentication",
        response:{
            200:z.object({
                TransactionList:z.array(z.object({
                    Id: z.string().uuid(),
                    Title: z.string(),
                    Value: z.number(),
                    Type:  z.enum(["DEP","SAL"]),
                    accountId:z.string().uuid(),
                    CreatedAt:z.date(),
                    Categories:z.enum([
                        "Alimentacao", "Educacao","Laser","Saude","Eletronicos","Compras","Beleza","Veiculo","Roupas","Investimento","Salario","Comissao","Outro"
                    ]).nullable(),
                    AccountTitle:z.string()
                }))
            }),
            400:z.object({
                Description:z.string(),
            })
        }
    },
    preHandler:[VerifyJWT]
}