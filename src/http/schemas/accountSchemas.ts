import z from "zod";


export const CreateAccountSchema = {
    schema:{
        tags:["Account"],
        description:"Route Used to create accounts by recieving the account data. needs a JWT token Authentication",
        body:z.object({
            Name:z.string(),
            Value:z.number().optional(),
            userId:z.string().uuid()
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
    }
}