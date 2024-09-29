import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { SearchControler } from "../controlers/Info/SearchControler";
import { SearcSchema, uploadImageRoute } from "../schemas/utilsSchemas";
import { SetUserProfilePicture } from "../controlers/User/SetUserProfilePicture";


export async function  utilRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get("/search/:Query/:Page",SearcSchema,SearchControler)
    app.withTypeProvider<ZodTypeProvider>().post("/upload/profile",uploadImageRoute,SetUserProfilePicture)
}