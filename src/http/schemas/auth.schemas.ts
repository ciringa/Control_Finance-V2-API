import z from "zod"
import { VerifyJWT } from "../midleware/VerifyJwt"
import { UserZodSchema } from "../../dtos/zod/User"

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

export const loginAsGuestSchema = {
    schema:{
        tags:["Auth"],
        description:"Route used to Login as a guest user(used in 'travelers mode'). Returns a JWT token with the travelers user ID",
    }
}
export const ProfileSchema = {
    schema:{
        tags:["Auth"],
        description:"Route used to recieve user info by providing a JWT Token as Bearer in Header",
        response:{
            200:z.object({
                Description:z.string(),
                Profile:UserZodSchema
            }),
            404:z.object({
                Description:z.string(),
            })
        }
    },
    preHandler:[VerifyJWT]
}