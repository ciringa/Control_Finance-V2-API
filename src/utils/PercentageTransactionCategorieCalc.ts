import { Transaction } from "@prisma/client";

export interface TransactionCategorieList {
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

export async function ReturnPercentagesList(data: Transaction[]) {
    let Values: TransactionCategorieList = {
        Alimentacao: 0,Educacao: 0,Laser: 0,
        Saude: 0,Eletronicos: 0,Compras: 0,
        Beleza: 0,Veiculo: 0,Roupas: 0,
        Investimento: 0,Comissao: 0,Salario: 0,
        Outro: 0
    };

    let total: number = 0;

    data.forEach(Element => {
        if (Element.Categories != null) {
            total += 1;
            switch (Element.Categories) {
                case "Alimentacao":
                    Values.Alimentacao += 1;
                    break;
                case "Educacao":
                    Values.Educacao += 1;
                    break;
                case "Laser":
                    Values.Laser += 1;
                    break;
                case "Saude":
                    Values.Saude += 1;
                    break;
                case "Eletronicos":
                    Values.Eletronicos += 1;
                    break;
                case "Compras":
                    Values.Compras += 1;
                    break;
                case "Beleza":
                    Values.Beleza += 1;
                    break;
                case "Veiculo":
                    Values.Veiculo += 1;
                    break;
                case "Roupas":
                    Values.Roupas += 1;
                    break;
                case "Investimento":
                    Values.Investimento += 1;
                    break;
                case "Comissao":
                    Values.Comissao += 1;
                    break;
                case "Salario":
                    Values.Salario += 1;
                    break;
                case "Outro":
                    Values.Outro += 1;
                    break;
            }
        }
    });

    let Percentages: TransactionCategorieList = {
        Alimentacao: (Values.Alimentacao / total) * 100,
        Educacao: (Values.Educacao / total) * 100,
        Laser: (Values.Laser / total) * 100,
        Saude: (Values.Saude / total) * 100,
        Eletronicos: (Values.Eletronicos / total) * 100,
        Compras: (Values.Compras / total) * 100,
        Beleza: (Values.Beleza / total) * 100,
        Veiculo: (Values.Veiculo / total) * 100,
        Roupas: (Values.Roupas / total) * 100,
        Investimento: (Values.Investimento / total) * 100,
        Comissao: (Values.Comissao / total) * 100,
        Salario: (Values.Salario / total) * 100,
        Outro: (Values.Outro / total) * 100
    };

    return Percentages;
}