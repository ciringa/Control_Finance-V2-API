import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export const swggerConfig =  {
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

}


/*

tags:[
            {name:"User",description:"Routes used to User management including registration and account delete functions"},
            {name:"Auth",description:"Routes used to Authenticate an user including the return of profile and login using specific JWT validations"},
            {name:"Account",description:"Routes used to Account management of an user. Most of these requires jwt token as headers. "},
        ], 

*/