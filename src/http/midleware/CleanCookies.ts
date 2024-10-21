import { FastifyReply, FastifyRequest } from "fastify";

export async function CleanCookies(req:FastifyRequest, res:FastifyReply) {
    if(req.cookies.Recovery){
        console.log("Recovery exists. Cleaning it's value")
        res.clearCookie("Recovery")
    }
    if(req.cookies.Email){
        res.clearCookie("Email")
    }
}