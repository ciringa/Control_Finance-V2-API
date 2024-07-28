import { Transaction } from "@prisma/client";
import { AccountRepositorie } from "../repositorie/account.repositorie";
import { TransactionsRepositorie } from "../repositorie/transactions.repositorie";
import { userRepositorie } from "../repositorie/user.repositorie";
import { UserDoesNotExists } from "./Error/MissedResourcesError";

interface ReturnTransactionByUserResquest{
    UserId:string
}

interface ReturnTransactionByUserResponse{
    TransactionList:Transaction[]
}
export class ReturnTransactionByUserUseCase{
    constructor(private transactionRepositorie:TransactionsRepositorie,private accountRepositorie:AccountRepositorie,private UserRepositorie:userRepositorie){}
    async execute({UserId}:ReturnTransactionByUserResquest):Promise<ReturnTransactionByUserResponse>{
            //checks if the user exists
            const doesTheUserExists = await this.UserRepositorie.findById(UserId)
            if(!doesTheUserExists){
                    throw new UserDoesNotExists
            } 
            var TransactionList:Transaction[] = []
            const returnAccountUserList = await this.accountRepositorie.findByUser(UserId)
            returnAccountUserList?.forEach(async Element=>{
                const returnAllTransactions = await this.transactionRepositorie.findByAccount(Element.Id)
                returnAllTransactions?.forEach(element => {
                    TransactionList.push(element)
                });
            })
            
        return{
            TransactionList,
        }
    }
}
