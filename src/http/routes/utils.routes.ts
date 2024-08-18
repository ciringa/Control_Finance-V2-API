import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { SearchControler } from "../controlers/SearchControler";
import { SearcSchema } from "../schemas/utilsSchemas";


export async function  utilRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get("/search/:Query/:Page",SearcSchema,SearchControler)
}