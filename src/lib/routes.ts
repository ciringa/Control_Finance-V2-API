import { FastifyInstance } from "fastify";
import { AutheticateRoutes } from "../http/routes/auth.routes";
import { TransactionRoutes } from "../http/routes/transaction.routes";
import { userRoutes } from "../http/routes/user.routes";
import { AccountRoutes } from "../http/routes/account.routes";
import { utilRoutes } from "../http/routes/utils.routes";
import { GoalsRoutes } from "../http/routes/goals.routes";


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