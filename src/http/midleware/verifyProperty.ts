//writes an route that cheks if the user is owner of the accessed value

import { FastifyRequest } from "fastify/types/request";

export async function VerifyOwnershipFromAccount(req:FastifyRequest) {
    const UserId = req.user.sub
    
}