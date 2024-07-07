import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export const swggerConfig =  {
    openapi: {
    openapi: '3.1.0',
    info: {
        title: 'SampleApi',
        description:`<h1>Control Finance V2 API Documentation</h1><br>Welcome this is the control finance api documentation Control finance 2 is a fullscale monetary management aplication\n`,
        version: '1.0.0',
    },
    tags:[
        {name:"User",description:"Routes used to User management including registration and account delete functions"},
        {name:"Auth",description:"Routes used to Authenticate an user including the return of profile and login using specific JWT validations"},
        {name:"Account",description:"Routes used to Account management of an user. Most of these requires jwt token as headers. "},
        {name:"Transaction",description:"Routes used to manage the Transactions data entity. all these routes require JWT token authentication. Every single transaction has on from two types SAL for withdraw moeny and DEP for Deposit money"},
    ],
    servers: [],
    },
    swagger:{
        swagger:"2.0.0"
    },
    transform: jsonSchemaTransform,
}

