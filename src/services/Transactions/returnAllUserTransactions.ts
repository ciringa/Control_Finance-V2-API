import { Transaction, TransactionCategories, Type } from "@prisma/client";
import { AccountRepositorie } from "../../repositorie/account.repositorie";
import { TransactionsRepositorie } from "../../repositorie/transactions.repositorie";
import { userRepositorie } from "../../repositorie/user.repositorie";
import { UserDoesNotExists } from "../.Error/MissedResourcesError";





interface ReturnAllTransactionsFromUserRequest{
    userId:string
}

type preTransaction = {
    Id: string;
    Title: string;
    Value: number;
    Type: Type;
    CreatedAt: Date;
    Categories: TransactionCategories | null;
    accountId: string;
    AccountTitle: string;
};

interface ReturnAllTransactionsFromUserResponse{
    TransactionList:preTransaction[]
}


export class ReturnAllTransactionsFromUserUseCase{
    constructor(private UserRepositorie:userRepositorie, private transactionsRepositorie:TransactionsRepositorie, private accountRepositorie:AccountRepositorie){}
    /**
     * Return transactions list from an user
     * 
     * @param {string} userId - The user Id
     * 
     * @returns {ReturnAllTransactionsFromUserResponse} - the list of transactions with extra info 
    */
   async execute({userId}:ReturnAllTransactionsFromUserRequest):Promise<ReturnAllTransactionsFromUserResponse>{
            //checks if the user exists
            const doesTheUserExists = await this.UserRepositorie.findById(userId)
            if(!doesTheUserExists){
                throw new UserDoesNotExists
            }   
            var TransactionList:preTransaction[] = []
            const AccountList = await this.accountRepositorie.findByUser(userId)
            if(AccountList){
                for(let i =0;i<AccountList?.length;i++){
                    var ReturnAccountTransactionList = await this.transactionsRepositorie.findByAccount(AccountList[i].Id)
                    if(ReturnAccountTransactionList){
                        for(let j = 0; j<ReturnAccountTransactionList?.length;j++){
                            const {Categories,CreatedAt,Id,Title,Type,Value,accountId} = ReturnAccountTransactionList[j]
                            const AccountTitle = AccountList[i].Name
                            TransactionList.push({
                                accountId,AccountTitle,Categories,CreatedAt,Id,Title,Type,Value
                            })
                        }

                    }

                }
            }
            return{
                TransactionList
            }
   }
}

