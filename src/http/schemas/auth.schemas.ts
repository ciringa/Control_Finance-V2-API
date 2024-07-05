import z from "zod"
import { VerifyJWT } from "../midleware/VerifyJwt"

export const LoginSchema = {
    schema:{
        tags:["Auth"],
        description:"Route used to Login, returns an JWT with the cryptografed code of the user ID",
        body:z.object({
            Email:z.string().email(),
            Senha: z.string(),
        }),
    
        response:{
            200:z.object({
                Description:z.string(),
                Token:z.string(),
            }),
            404:z.object({
                Description:z.string(),
            }),
            401:z.object({
                Description:z.string(),
            })
        }
    }
}

export const ProfileSchema = {
    schema:{
        tags:["Auth"],
        description:"Route used to recieve user info by providing a JWT Token as Bearer in Header",
        response:{
            200:z.object({
                Description:z.string(),
                Profile:z.object({
                    Id: z.string().uuid(),
                    Email:z.string().email(),
                    Senha:z.string(),
                    UsernName: z.string(),
                })
            }),
            404:z.object({
                Description:z.string(),
            })
        }
    },
    preHandler:[VerifyJWT]
}