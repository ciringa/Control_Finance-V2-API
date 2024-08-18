import { FastifyInstance } from "fastify";
import { AutheticateRoutes } from "./routes/auth.routes";
import { TransactionRoutes } from "./routes/transaction.routes";
import { userRoutes } from "./routes/user.routes";
import { AccountRoutes } from "./routes/account.routes";
import { utilRoutes } from "./routes/utils.routes";
import { GoalsRoutes } from "./routes/goals.routes";


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