import fastify from "fastify";
import { serializerCompiler, validatorCompiler} from "fastify-type-provider-zod";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";
import { swggerConfig } from "./swagger";
import { fastifyJwt} from "@fastify/jwt";
import { JWT_SECRET } from "./env";
import { Router } from "./routes";
import { load } from "js-yaml";
import { readFileSync } from "fs";


export const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, swggerConfig);
app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
});
app.register(fastifyJwt,{
    secret: JWT_SECRET
})
/*
app.addHook("preHandler",async(req,res)=>{
    console.log(req.routeOptions)
})
*/
app.addHook("onError",async(request, reply, error)=>{
    console.log(error)
})

app.register(Router)
