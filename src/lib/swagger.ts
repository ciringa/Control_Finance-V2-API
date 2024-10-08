
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { API_VERSION } from "./env";



export const swggerConfig = {
    openapi: {
    openapi: '3.1.0',
    info: {
        title: 'Control Finance APi',
        description:`<h1>Control Finance V2 API Documentation</h1><br>Welcome this is the control finance api documentation Control finance 2 is a fullscale monetary management aplication<ul><li><a href="https://github.com/ciringa">Creator Profile</a></li><li><a href="https://github.com/ismael-henrique-dev/Control-Finance-v2">FrontEnd Example</a></li></ul>`,
        version: API_VERSION,
    },
    tags:[
        {name:"User",description:"Routes used to User management including registration and account delete functions"},
        {name:"Auth",description:"Routes used to Authenticate an user including the return of profile and login using specific JWT validations"},
        {name:"Account",description:"Routes used to Account management of an user. Most of these requires jwt token as headers. "},
        {name:"Goals",description:"Routes used to manage Goals Entity, goals are something you want to achieve in a defined space of time, the routes below are used to manage this functioning. Most of these require JWT Tokens validation"},
        {name:"Transaction",description:"Routes used to manage the Transactions data entity. all these routes require JWT token authentication. Every single transaction has on from two types SAL for withdraw moeny and DEP for Deposit money"},
        {name:"Utils",description:"Randonly usefull routes used to help the aplication"},
        {name:"Statics",description:"Routes used to return standard informations"},
    ],
    servers: [],
    externalDocs: {
        description: 'External docs',
        url: 'https://github.com/ciringa/Control_Finance-V2-API/tree/main/documentation'
    },
    },
    swagger:{
        swagger:"2.0.0"
    },
    transform: jsonSchemaTransform,
}

