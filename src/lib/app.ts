import fastify from "fastify";
import { serializerCompiler, validatorCompiler} from "fastify-type-provider-zod";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";
import { swggerConfig } from "./swagger";
import { fastifyJwt} from "@fastify/jwt";
import { JWT_SECRET, NODE_ENV } from "./env";
import { Router } from "../http/routes";
import cors from "@fastify/cors"

// Setup a fastify instance
export const app = fastify()

//validation methods used for zod and swagger
app.setValidatorCompiler(validatorCompiler); 
app.setSerializerCompiler(serializerCompiler);

//Fastify Swagger linkage
app.register(fastifySwagger, swggerConfig);
app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
});
//register fastifyJWT
app.register(fastifyJwt,{
    secret: JWT_SECRET
})

//register CORS
app.register(cors, { 
    origin: true, // Permite todas as origens. Para restringir, você pode especificar uma URL, como 'http://localhost:3000'
    methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true // Permite o envio de cookies e headers de autorização entre o frontend e o backend
});

// Changes development mode based in NODE_ENV Development mode
NODE_ENV =="DEV"?(
    app.addHook("preHandler",async(req,res)=>{
        console.log(req.routeOptions)
    }),
    app.addHook("onError",async(request, reply, error)=>{
        console.log(error)
    })
):(
    console.log("aplication is running....")
)


//Register APlication Routes where all the API's routes are registered
app.register(Router)
