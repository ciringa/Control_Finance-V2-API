import { z } from "zod";
import { VerifyJWT } from "../midleware/VerifyJwt";
import { upload } from "../../lib/multer/multerConfig";
import { FastifyRouteSchemaDef } from "fastify/types/schema";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { UserZodSchema } from "../../dtos/zod/User";
import { AccountZodSchema } from "../../dtos/zod/Account";


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
                    sum:z.number(),
                    totalWithdraw:z.number(),
                    totalDeposit:z.number(),
                }),
                AccountStatics:z.array(z.object({
                    sum:z.number(),
                    WithdrawValue:z.number(),
                    DepositValue:z.number(),
                    accountTitle:z.string(),
                    AcId:z.string().uuid(),
                    Type:z.enum(["Carteira","Poupanca","ContaBancaria","CorretoraDeInvestimentos"]),
                }).nullable()),
                AccountList:z.array(AccountZodSchema).nullable()
            }),
            404:z.object({
                Description:z.string(),
            })
        }
    },
    preHandler:[VerifyJWT]
}

//Isso aqui tem muitas chances de dar merda depois 
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
                    PercentageOfReturnByDep:z.object({
                        Comissao:z.number(),Investimento:z.number(),Outro:z.number(),Salario:z.number()
                    }),
                    PercentageOfReturnBySal:z.object({
                        Alimentacao:z.number(),Beleza:z.number(),Compras:z.number(),Educacao:z.number(),
                        Eletronicos:z.number(),Laser:z.number(),Outro:z.number(),Roupas:z.number(),Saude:z.number(),Veiculo:z.number()
                    })
                 }),
                 TransactionsByDate:z.record(z.string(), z.array(z.object({
                    Id: z.string().uuid(),
                    Title: z.string(),
                    Value: z.number(),
                    Type:  z.enum(["DEP","SAL"]),
                    accountId:z.string().uuid(),
                    CreatedAt:z.date(),
                    Categories:z.enum([
                        "Alimentacao", "Educacao","Laser","Saude","Eletronicos","Compras","Beleza","Veiculo","Roupas","Investimento","Salario","Comissao","Outro"
                    ]).nullable()
                 }))),
                 AccountState:z.object({
                    AndamentoDasMetas:z.enum(["Danger","Ok","Good"]),
                    Economista:z.enum(["Danger","Ok","Good"]),
                    GastosEssenciais:z.enum(["Danger","Ok","Good"]),
                    Investimentos:z.enum(["Danger","Ok","Good"])
                })
                }),
                400:z.object({
                    Description:z.string(),
                })
            }

            
        },
        preHandler:[VerifyJWT]
    }

export const UserDeleteSchema = {
    schema:{
        tags:["User"],
        description:"delete user. Recieves an JWT Token",
        response:{
            201:z.object({
                Description:z.string(),
                result:z.object({
                    TotalTransactionsDeleted: z.number(),
                    TotalAccountsDeleted:z.number(),
                    TotalGoalsDeleted:z.number()
                }),
                deletedUser:UserZodSchema
            }),
            400:z.object({
                Description:z.string(),
            })
            }

            
        },
        preHandler:[VerifyJWT]
}
export const UserResetSchema = {
    schema:{
        tags:["User"],
        description:"Resets user account deleting all its accounts and transactions. Recieves an JWT Token",
        response:{
            201:z.object({
                Description:z.string(),
                result:z.object({
                    TotalTransactionsDeleted: z.number(),
                    TotalAccountsDeleted:z.number(),
                    TotalGoalsDeleted:z.number()
                })
            }),
            400:z.object({
                Description:z.string(),
            })
            }

            
        },
        preHandler:[VerifyJWT]
}
//user image upload schema be carefull with this
export const UserProfileUploadPictureSchema = {
    schema:{
        tags:["User"],
        description:"Changes the user profile image. Recieves an JWT Token",
        response:{
            201:z.object({
                Description:z.string()
            }),
            400:z.object({
                Description:z.string(),
            })
            }

            
        },
        preHandler:[VerifyJWT, function(){
            upload.single("avatar") // sets up an spected upload of a single file called avatar 
        }]
}

export const updateUserSchema = {
    schema:{
        tags:["User"],
        description:"Updated the user profile. Recieves an JWT Token",
        body:z.object({
            Email: z.string().optional(),
            Senha: z.string().optional(),
            UsernName:z.string().optional(),
        }),
        response:{
            201:z.object({
                Description:z.string(),
                Content:UserZodSchema
            }),
            404:z.object({
                Description:z.string(),
                Error:z.string()
            }),
            401:z.object({
                Description:z.string(),
                Error:z.string()
            })
            }
        },
        preHandler:[VerifyJWT]
}