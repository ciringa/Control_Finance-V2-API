import fastify from "fastify";
import { serializerCompiler, validatorCompiler} from "fastify-type-provider-zod";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";
import { swggerConfig } from "./swagger";
import { userRoutes } from "../http/user.routes";
import { AccountRoutes } from "../http/account.routes";
import { fastifyJwt} from "@fastify/jwt";
import { AutheticateRoutes } from "../http/auth.routes";
import { TransactionRoutes } from "../http/transaction.routes";
import { JWT_SECRET } from "./env";


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

app.register(AutheticateRoutes)
app.register(userRoutes)
app.register(AccountRoutes)
app.register(TransactionRoutes)