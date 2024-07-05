import { FastifyRequest } from "fastify";

export async function VerifyJWT(req:FastifyRequest){
    await req.jwtVerify()
}