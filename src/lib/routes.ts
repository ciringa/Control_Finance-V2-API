import { FastifyInstance } from "fastify";
import { AutheticateRoutes } from "../http/auth.routes";
import { TransactionRoutes } from "../http/transaction.routes";
import { userRoutes } from "../http/user.routes";
import { AccountRoutes } from "../http/account.routes";
import { utilRoutes } from "../http/utils.routes";
import { GoalsRoutes } from "../http/goals.routes";


export async function Router(app:FastifyInstance) {
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