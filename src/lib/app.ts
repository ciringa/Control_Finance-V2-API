import fastify from "fastify";
import { serializerCompiler, validatorCompiler,jsonSchemaTransform} from "fastify-type-provider-zod";

import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";
import { swagger } from "./swagger";


export const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.register(swagger)

