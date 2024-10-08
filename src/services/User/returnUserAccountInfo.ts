import { Account, AccountType, Transaction } from "@prisma/client";
import { start } from "repl";
import { log } from "console";
import { userRepositorie } from "../../repositorie/user.repositorie";
import { AccountRepositorie } from "../../repositorie/account.repositorie";
import { TransactionsRepositorie } from "../../repositorie/transactions.repositorie";
import { UserDoesNotExists } from "../.Error/MissedResourcesError";

interface returnUserAccountListUseCaseRequest{
    userId:string
}
interface returnUserAccountListUseCaseResponse{
    Statics:{
        sum:number,
        totalWithdraw:number,
        totalDeposit:number
    },
    AccountStatics:{
        AcId:string,
        Type:AccountType,
        sum:number,
        WithdrawValue:number,
        DepositValue:number,
        accountTitle:string
    }[],
    AccountList:Account[] | null
}

export class returnUserAccountInfoUseCase{
    constructor(private UserRepositorie:userRepositorie,private accountRepositorie:AccountRepositorie, private transactionRepositorie:TransactionsRepositorie){}
    /**
     * retorna as informaçoes relativas ao usuario, incluindo statisticas de entrada e saida de dinheiro da conta e de cada uma das transações 
     *
     * @param {string} userId - O usuario ao qual se deseja consultar a resposta.
     */
    async execute({userId}:returnUserAccountListUseCaseRequest):Promise<returnUserAccountListUseCaseResponse>{
        const doesTHeUserExists = await this.UserRepositorie.findById(userId)
        if(!doesTHeUserExists){
            throw new UserDoesNotExists
        }
        //search through a list of acounts to find the user
        const AccountList = await this.accountRepositorie.findByUser(userId)

        //Sum the value of the Account List
        interface returnWithdrawAndOthers{
            AcId:string,
            Type:AccountType,
            sum:number,
            WithdrawValue:number,
            DepositValue:number,
            accountTitle:string
        }
        interface ReturnGlobalInfo{
            sum:number,
            totalWithdraw:number,
            totalDeposit:number
        }
        var transactionList:Transaction[]=[],AccountStatics:returnWithdrawAndOthers[]=[]
        var GlobalStatics:ReturnGlobalInfo = {sum:0,totalDeposit:0,totalWithdraw:0}
        if(AccountList){
            for(let i=0; i<AccountList.length; i++){
                GlobalStatics.sum = (GlobalStatics.sum + AccountList[i].Value)
                //return transaction list from the account
                var buildUpObject:returnWithdrawAndOthers = {accountTitle:"",DepositValue:0,sum:0,WithdrawValue:0,AcId:"",Type:"Carteira"}
                const specifiedTransaction = await this.transactionRepositorie.findByAccount(AccountList[i].Id)
                if(specifiedTransaction){
                    for(let j=0;j<specifiedTransaction?.length;j++){
                        var Element = specifiedTransaction[j]
                        if(Element.Type=="DEP"){
                            buildUpObject.DepositValue += Element.Value
                            buildUpObject.sum += Element.Value
    
                            GlobalStatics.totalDeposit+=Element.Value
                        }else{
                            //sends to AccountStatics
                            buildUpObject.WithdrawValue += Element.Value
                            buildUpObject.sum -= Element.Value
                            //sends to global statics
                            GlobalStatics.totalWithdraw+=Element.Value
                        }
                        transactionList.push(Element)
                    }

                }
                var starterValue = AccountList[i].Value - buildUpObject.sum
                buildUpObject.accountTitle = AccountList[i].Name
                buildUpObject.sum+=starterValue
                buildUpObject.AcId = AccountList[i].Id
                buildUpObject.Type = AccountList[i].Type
                AccountStatics.push(buildUpObject)
            }
        }

        return{
            Statics:GlobalStatics,
            AccountStatics,
            AccountList,
        }
    }
}