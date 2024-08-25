-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('Carteira', 'ContaBancaria', 'Poupanca', 'CorretoraDeInvestimentos');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "Type" "AccountType" NOT NULL DEFAULT 'Poupanca';

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
