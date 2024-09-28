import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { loginAsGuestSchema, LoginSchema, ProfileSchema } from "../schemas/auth.schemas";
import { ReturnProfile } from "../controlers/User/ProfileControler";
import { AutheticateUser } from "../controlers/Authenticate/AuthenticaControler";
import { LoginAsGuestControler } from "../controlers/Authenticate/LoginAsGuestControler";


export async function AutheticateRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().patch("/login",LoginSchema,AutheticateUser)
    app.withTypeProvider<ZodTypeProvider>().patch("/login/guest",loginAsGuestSchema,LoginAsGuestControler)
    app.withTypeProvider<ZodTypeProvider>().get("/profile",ProfileSchema,ReturnProfile)
}