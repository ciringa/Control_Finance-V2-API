import fastify from "fastify";
import { serializerCompiler, validatorCompiler} from "fastify-type-provider-zod";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";
import { swggerConfig } from "./swagger";
import { fastifyJwt} from "@fastify/jwt";
import { JWT_SECRET, NODE_ENV } from "./env";
import { Router } from "../http/routes";
import cors from "@fastify/cors"

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

//register CORS
app.register(cors, { 
    origin: true, // Permite todas as origens. Para restringir, você pode especificar uma URL, como 'http://localhost:3000'
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true // Permite o envio de cookies e headers de autorização entre o frontend e o backend
});


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



app.register(Router)
