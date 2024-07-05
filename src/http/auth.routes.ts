import { FastifyInstance } from "fastify";
import { RegisterUserControler } from "./controlers/RegisterUserControler";
import { RegisterUserSchema } from "./schemas/userSchemas";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { LoginSchema, ProfileSchema } from "./schemas/auth.schemas";
import { ReturnProfile } from "./controlers/ProfileControler";
import { AutheticateUser } from "./controlers/AuthenticaControler";

export async function AutheticateRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().patch("/auth/login",LoginSchema,AutheticateUser)
    app.withTypeProvider<ZodTypeProvider>().get("/auth/profile",ProfileSchema,ReturnProfile)
}