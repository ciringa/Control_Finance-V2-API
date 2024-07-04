import fastify from "fastify";
import { serializerCompiler, validatorCompiler,jsonSchemaTransform} from "fastify-type-provider-zod";

import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";
import { swagger } from "./swagger";
import { userRoutes } from "../http/user.routes";
import { AccountRoutes } from "../http/account.routes";


export const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
    openapi: {
    openapi: '3.1.0',
    info: {
        title: 'SampleApi',
        description: 'Sample backend service',
        version: '1.0.0',
    },
    tags:[
        {name:"User",description:"Routes used to User management including registration and account delete functions"},
        {name:"Auth",description:"Routes used to Authenticate an user including the return of profile and login using specific JWT validations"},
        {name:"Account",description:"Routes used to Account management of an user. Most of these requires jwt token as headers. "},
    ],
    servers: [],
    },
    swagger:{
        swagger:"2.0.0"
    },
    transform: jsonSchemaTransform,

});

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
});


app.register(userRoutes)
app.register(AccountRoutes)