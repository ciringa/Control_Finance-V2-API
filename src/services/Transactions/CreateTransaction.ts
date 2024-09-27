import { Prisma, Transaction } from "@prisma/client";
import { TransactionsRepositorie } from "../../repositorie/transactions.repositorie";
import { AccountRepositorie } from "../../repositorie/account.repositorie";
import { AccountDoesNotExists } from "../.Error/MissedResourcesError";
import { InvalidTagProvidedToTransactionType } from "../.Error/WrongProvidedParams";


interface CreateTransactionResquest{
    data:Prisma.TransactionUncheckedCreateInput,
}
interface CreateTransactionResponse{
    Transaction:Transaction,
    Account:{
        Value:number,
        Id:string
    }
}
export class CreateTransactionUseCase {
    constructor(private transactionRepositorie:TransactionsRepositorie, private accountRepositorie:AccountRepositorie){}

    async execute({data}:CreateTransactionResquest):Promise<CreateTransactionResponse>{
        ///checks if the Account Exists
        const doesTheAccountExists = await this.accountRepositorie.findById(data.accountId)
        if(!doesTheAccountExists){
            throw new AccountDoesNotExists
        }
        //Chnages the Account value Based in the Transaction value and type 
        var newAccountValue:number = 0
        if(data.Type=="DEP"){
            newAccountValue =(doesTheAccountExists.Value + data.Value)
        }else if(data.Type=="SAL"){
            newAccountValue = (doesTheAccountExists.Value - data.Value)
        }
        const updateAccount  =await this.accountRepositorie.updateAccountValue(data.accountId,newAccountValue) 
        
        //Check if the provided tag is acceptable here
        if(data.Type=="DEP"){
            if(data.Categories=="Alimentacao"||data.Categories=="Educacao"||data.Categories=="Laser"||data.Categories=="Saude"||
               data.Categories=="Eletronicos"||data.Categories=="Compras"||data.Categories=="Beleza"||data.Categories=="Veiculo"||
               data.Categories=="Roupas"){  
                throw new InvalidTagProvidedToTransactionType
            }
        }else if(data.Type=="SAL"){
            if(data.Categories=="Investimento"||data.Categories=="Salario"||data.Categories=="Comissao"||data.Categories=="Outro"){
                throw new InvalidTagProvidedToTransactionType
            }
        }
        //create transaction 
        const Transaction = await this.transactionRepositorie.create(data)
        return {
            Transaction,
            Account:{
                Value:updateAccount.Value,
                Id:updateAccount.Id
            }
        }
    }
}