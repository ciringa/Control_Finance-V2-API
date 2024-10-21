import { Transaction } from "@prisma/client";
import { groupBy } from "lodash"
export function groupTransactionsByMonthAndYear(transactions: Transaction[]): Record<string, Transaction[]> {
  // Função auxiliar para formatar a data no formato "YYYY-MM"
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  };

  // Agrupar as transações pela data formatada
  return groupBy(transactions, (transaction) => formatDate(transaction.CreatedAt));
}

