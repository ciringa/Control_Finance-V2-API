import { z } from "zod";

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