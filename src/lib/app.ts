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


app.register(Router)
