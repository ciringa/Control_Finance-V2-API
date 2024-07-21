import z from "zod";
import { VerifyJWT } from "../midleware/VerifyJwt";

export const CreateTransactionSchema = {
    schema:{
        tags:["Transaction"],
        description:"Route Used to create Transactions.Checks if the current Logged user is owner of the refered <Account>. needs a JWT token Authentication",
        body:z.object({
            Title: z.string(),
            Value: z.number(),
            Type:  z.enum(["DEP","SAL"]),
            accountId:z.string().uuid(),
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
                })
            }),
            404:z.object({
                Description:z.string(),
            })
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
                }),
                New:z.object({
                    Id: z.string().uuid(),
                    Title: z.string(),
                    Value: z.number(),
                    Type:  z.enum(["DEP","SAL"]),
                    accountId:z.string().uuid(),
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

export const ReturnTransactionLisSchemat = {
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
                }))
            }),
            400:z.object({
                Description:z.string(),
            })
        }
    },
    preHandler:[VerifyJWT]
}