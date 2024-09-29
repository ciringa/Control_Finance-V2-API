import z from "zod";

export const TransactionZodSchema = z.object({
    Id: z.string().uuid(),
    Title: z.string(),
    Value: z.number(),
    Type:  z.enum(["DEP","SAL"]),
    accountId:z.string().uuid(),
    CreatedAt:z.date(),
    Categories:z.enum([
        "Alimentacao", "Educacao","Laser","Saude","Eletronicos","Compras","Beleza","Veiculo","Roupas","Investimento","Salario","Comissao","Outro"
    ]).nullable(),
    AccountTitle:z.string()
})