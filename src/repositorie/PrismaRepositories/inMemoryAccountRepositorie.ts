import { Account, Prisma } from "@prisma/client";
import { AccountRepositorie } from "../account.repositorie";
import { randomUUID } from "crypto";
import { prisma } from "../../lib/prisma";

export class PrismaAccountRepositorie implements AccountRepositorie{

    async create(data:Prisma.AccountUncheckedCreateInput){
        const createdObject = await prisma.account.create({
            data
        })
        return createdObject
    }
}