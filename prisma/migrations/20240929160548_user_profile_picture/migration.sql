-- CreateEnum
CREATE TYPE "GoalCategory" AS ENUM ('FundoDeEmergencia', 'CartaoDeCredito', 'EconomiaParaGrandesCompras', 'EducacaoFinanceira');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ProfileUrl" TEXT;
