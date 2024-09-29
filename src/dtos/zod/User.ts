import z from "zod";

export const UserZodSchema = z.object({
    Id: z.string().uuid(),
    Email:z.string().email(),
    Senha:z.string(),
    UsernName: z.string(),
    ProfileUrl:z.string().nullable()
})