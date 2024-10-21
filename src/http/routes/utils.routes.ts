import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { SearchControler } from "../controlers/Info/SearchControler";
import { SearcSchema, uploadImageRoute } from "../schemas/utilsSchemas";
import { SetUserProfilePicture } from "../controlers/User/SetUserProfilePicture";
import { GenPasswordRecoveryCodeController } from "../controlers/Authenticate/PasswordRecovery/GenPasswordRecoveryCodeController";
import { RecoveryPasswordController } from "../controlers/Authenticate/PasswordRecovery/RecoveryPasswordByCode";
import { CleanCookies } from "../midleware/CleanCookies";


export async function  utilRoutes(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get("/search/:Query/:Page",SearcSchema,SearchControler)
    app.withTypeProvider<ZodTypeProvider>().post("/upload/profile",uploadImageRoute,SetUserProfilePicture)
    app.withTypeProvider<ZodTypeProvider>().get("/recovery/:Email",{
        preHandler:[CleanCookies]//clean cookies if needed
    },GenPasswordRecoveryCodeController)
    app.put("/recovery",RecoveryPasswordController)
}

