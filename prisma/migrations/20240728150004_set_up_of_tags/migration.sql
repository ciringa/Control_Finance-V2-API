-- CreateEnum
CREATE TYPE "TransactionCategories" AS ENUM ('Alimentacao', 'Educacao', 'Laser', 'Saude', 'Eletronicos', 'Compras', 'Beleza', 'Veiculo', 'Roupas', 'Investimento', 'Salario', 'Comissao', 'Outro');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "Categories" "TransactionCategories";
