//writes an route that cheks if the user is owner of the accessed value

import { prisma } from "../../lib/prisma";
import { UserIsNotOwnerOfTHeAccount } from "../Error/ownerShiptErros";

export async function VerifyOwnershipFromAccount(userId:string, AccountId:string) {
    const testObject = await prisma.account.findUnique({where:{Id:AccountId}})
    if(!(testObject?.userId==userId)){
        throw new UserIsNotOwnerOfTHeAccount
    }
}