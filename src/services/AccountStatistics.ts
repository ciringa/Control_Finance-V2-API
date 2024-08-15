import { Account, Transaction } from "@prisma/client";
import { AccountRepositorie } from "../repositorie/account.repositorie";
import { TransactionsRepositorie } from "../repositorie/transactions.repositorie";
import { userRepositorie } from "../repositorie/user.repositorie";
import { UserDoesNotExists } from "./Error/MissedResourcesError";
import { ReturnPercentagesList, TransactionCategorieList } from "../utils/PercentageTransactionCategorieCalc";
import { returnUserAccountInfoUseCase } from "./returnUserAccountInfo";


interface AccountStatistcsRequest{
    userId:string
}

interface AccountStatistcsReply{
    Data:{
        TotalAccount:number,
        TotalAccountTransactions:number,
        DEP:number,
        SAL:number
    },
    Relative:{
        DEP:number,
        SAL:number,
        PercentageOfReturnByCategorie:TransactionCategorieList
    },
    AccountState:{
        Alimentacao: number;
        Educacao: number;
        Laser: number;
        Saude: number;
        Eletronicos: number;
        Compras: number;
        Beleza: number;
        Veiculo: number;
        Roupas: number;
        Investimento: number;
        Comissao: number;
        Salario: number;
        Outro: number;
    }
}
export class AccountStatistcsUseCase {
    constructor(private usersRepositorie:userRepositorie, private accountRepositorie:AccountRepositorie, private transactionRepositorie:TransactionsRepositorie){}
    async execute({userId}:AccountStatistcsRequest):Promise<AccountStatistcsReply | {}>{
        //check if the user exists
        const doesTheUserExists = await this.usersRepositorie.findById(userId)
        if(!doesTheUserExists){
            throw new UserDoesNotExists
        }
        //checks if the user has any account wich can be found
        const doesTheUserHasAnyAccount = await this.accountRepositorie.findByUser(userId)
        if(!doesTheUserHasAnyAccount){
            //Eu espero que nunca caia aqui !!!
            return {}
        }
        var TransactionList:Transaction[] = []
        var totalDep:number=0, totalSal:number=0
        const func = async (Element:Account)=>{
            const thisAccountReturnList = await this.transactionRepositorie.findByAccount(Element.Id)
            if(thisAccountReturnList){
                TransactionList = TransactionList.concat(thisAccountReturnList)
            }
        }
        for(let i =0;i<doesTheUserHasAnyAccount.length;i++){
            await func(doesTheUserHasAnyAccount[i])
        }

        TransactionList.forEach(async Element=>{
            if(Element.Type=="DEP"){
                totalDep+=1
            }else if(Element.Type == "SAL"){
                totalSal += 1
            }
        })


        return {
            Data:{
                TotalAccount:doesTheUserHasAnyAccount?.length,
                TotalAccountTransactions: TransactionList.length,
                DEP:totalDep,
                SAL:totalSal
            },
            Relative:{
                DEP: (totalDep / TransactionList.length) * 100,
                SAL: (totalSal / TransactionList.length) * 100,
                PercentageOfReturnByCategorie:await ReturnPercentagesList(TransactionList)
            }
        }
    }
}