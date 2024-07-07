import { z } from "zod";
import { VerifyJWT } from "../midleware/VerifyJwt";

export const RegisterUserSchema = {
    schema:{
        tags:["User"],
        description:"Route used to register an user. If success returns the user info",
        body:z.object({
            Email:z.string().email(),
            Senha: z.string(),
            UsernName: z.string(),
        }),
        response:{
            201:z.object({
                Description:z.string(),
            }),
            404:z.object({
                Description:z.string(),
            })
        }
    }
}

export const ReturnAccountDataSchema = {
    schema:{
        tags:["User"],
        description:"Route Used to return User Account list and some more info like the sum of money of all accounts. Requires the JWT Token Validation",
        params:z.object({
            AcId:z.string().uuid()
        }),
        response:{
            201:z.object({
                Statics:z.object({
                    sum:z.number() 
                }),
                AccountList:z.array(z.object({
                    Id: z.string().uuid(),
                    Name:z.string(),
                    Value:z.number(),
                    userId:z.string().uuid(),
                })).nullable()
            }),
            404:z.object({
                Description:z.string(),
            })
            
        }
    },
    preHandler:[VerifyJWT]
}