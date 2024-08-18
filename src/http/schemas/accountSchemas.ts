import z from "zod";
import { VerifyJWT } from "../midleware/VerifyJwt";
import { ZodTypeProvider} from "fastify-type-provider-zod";

export const CreateAccountSchema = {
    schema:{
        tags:["Account"],
        description:"Route Used to create accounts by recieving the account data. needs a JWT token Authentication",
        body:z.object({
            Name:z.string(),
            Value:z.number().optional(),
        }),
        response:{
            201:z.object({
                Description:z.string(),
                CreateAccount:z.object({
                    createdObject:z.object({
                        Id: z.string().uuid(),
                        Name: z.string(),
                        Value: z.number(),
                        userId: z.string().uuid(),
                    })
                })
            }),
            404:z.object({
                Description:z.string(),
            })
        }
    },
    preHandler:[VerifyJWT]
}
export const ReturnAccountDataSchema = {
    schema:{
        tags:["Account"],
        description:"Route Used to return Account data by recieving it's ID, also provides info about withdraw, deposit and sum with the lists of transactions in the account. needs a JWT token Authentication",
        params:z.object({
            AcId:z.string().uuid()
        }),
        response:{
            201:z.object({
                Account:z.object({
                    Id: z.string().uuid(),
                    Name: z.string(),
                    Value: z.number(),
                    userId: z.string().uuid(),
                }),
                statistic:z.object({
                        Deposit:z.number(),
                        Withdraw:z.number(),
                        Total:z.number(),
                        sum:z.number(),
                        TransactionAmount:z.number().nullable(),
                    
                }),
                TransactionList:z.array(z.object({
                    Id: z.string().uuid(),
                    Title: z.string(),
                    Value: z.number(),
                    Type:  z.enum(["DEP","SAL"]),
                    accountId:z.string().uuid(),
                    Categories:z.enum([
                        "Alimentacao", "Educacao","Laser","Saude","Eletronicos","Compras","Beleza","Veiculo","Roupas","Investimento","Salario","Comissao","Outro"
                    ]).nullable()
                }))
            }),
            404:z.object({
                Description:z.string(),
            })
            
        }
    },
    preHandler:[VerifyJWT]
}


export const DelteAccountSchema = {
    schema:{
        tags:["Account"],
        description:"Route Used to delete all the accounts and all the transactions inside this account. needs a JWT token Authentication",
        params:z.object({
            AcId:z.string().uuid()
        }),
        response:{
            200:z.object({
                Description:z.string(),
            }),
            400:z.object({
                Description:z.string(),
            })
            
        }
    },
    preHandler:[VerifyJWT]
}

export const RenameAccountSchema = {
    schema:{
        tags:["Account"],
        description:"Route Used to rename an specified account by recieving its account id as parameter. needs a JWT token Authentication",
        params:z.object({
            AcId:z.string().uuid()
        }),
        body:z.object({
            Name: z.string(),
        }),
        response:{
            201:z.object({
                Description:z.string(),
            }),
            400:z.object({
                Description:z.string(),
            })
            
        }
    },
    preHandler:[VerifyJWT]
}