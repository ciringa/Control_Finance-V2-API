import { FastifyInstance, FastifyRequest } from "fastify";
import { AutheticateRoutes } from "./routes/auth.routes";
import { TransactionRoutes } from "./routes/transaction.routes";
import { userRoutes } from "./routes/user.routes";
import { AccountRoutes } from "./routes/account.routes";
import { utilRoutes } from "./routes/utils.routes";
import { GoalsRoutes } from "./routes/goals.routes";
import { ZodError } from "zod";


export async function Router(app:FastifyInstance) {
    app.addHook("onError",(req,res,err,done)=>{
        if(err instanceof ZodError){
            return res.status(500).send({
                StatusCode:500,
                Description:"Wrong Schema",
                Error:err.format()
            })
        }
        return res.status(500).send({
            Description:"Server error",
            StatusCode:500,
            Error:err
        })
        done()
    })

    app.get("/",(req,res)=>{
        res.redirect("/docs")
    })
    app.register(AutheticateRoutes, {
        prefix:"/auth"
    })
    app.register(userRoutes,{
        prefix:"/users"
    })
    app.register(AccountRoutes,{
        prefix:"/account"
    })
    app.register(TransactionRoutes,{
        prefix:"/transaction"
    })
    app.register(utilRoutes)
    app.register(GoalsRoutes,{
        prefix:"/goals"
    })
}