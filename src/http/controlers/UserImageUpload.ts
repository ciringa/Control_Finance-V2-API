import { FastifyReply, FastifyRequest } from "fastify";


export async function UserImageUploadControler(req:FastifyRequest, res:FastifyReply){
    const t = req.file
}