import { z } from "zod";
import { VerifyJWT } from "../midleware/VerifyJwt";

export const RegisterUserSchema = {
    schema:{
        tags:["User"],
        description:"Route used to register an user. If success returns the user info",
        body:z.object({
            Email:z.string().email(),
            Senha: z.string(),
            UsernName: z.string(),
        }),
        response:{
            201:z.object({
                Description:z.string(),
            }),
            404:z.object({
                Description:z.string(),
            })
        }
    }
}

export const ReturnAccountDataSchema = {
    schema:{
        tags:["User","Statics"],
        description:"Route Used to return User Account list and some more info like the sum of money of all accounts. Requires the JWT Token Validation",
        response:{
            201:z.object({
                Statics:z.object({
                    sum:z.number() 
                }),
                AccountStatics:z.array(z.object({
                    sum:z.number(),
                    WithdrawValue:z.number(),
                    DepositValue:z.number(),
                    accountTitle:z.string(),
                }).nullable()),
                AccountList:z.array(z.object({
                    Id: z.string().uuid(),
                    Name:z.string(),
                    Value:z.number(),
                    userId:z.string().uuid(),
                })).nullable()
            }),
            404:z.object({
                Description:z.string(),
            })
            
        }
    },
    preHandler:[VerifyJWT]
}


export const ReturnAccountStatistic = {
    schema:{
        tags:["User","Statics"],
        description:"Return User statistic, includes raw number and percentage number. Recieves an JWT Token",
        response:{
            201:z.object({
                Data:z.object({
                    TotalAccount:z.number(),
                    TotalAccountTransactions:z.number(),
                    DEP:z.number(),
                    SAL:z.number(),
                }),
                Relative:z.object({
                    DEP:z.number(),
                    SAL:z.number(),
                    PercentageOfReturnByCategorie:z.object({
                        Alimentacao: z.number(),
                        Educacao:z.number(),
                        Laser:z.number(),
                        Saude:z.number(),
                        Eletronicos: z.number(),
                        Compras:z.number(),
                        Beleza: z.number(),
                        Veiculo:z.number(),
                        Roupas: z.number(),
                        Investimento:z.number(),
                        Comissao:z.number(),
                        Salario:z.number(),
                        Outro: z.number(),
                    }),
                    AccountState:z.object({
        
                    })
                 })
                }),
                400:z.object({
                    Description:z.string(),
                })
            }

            
        },
        preHandler:[VerifyJWT]
    }



