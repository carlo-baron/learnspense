import { ExpensesCategoryWithPriceType } from "./expensesTypes";

export type HistoryType = {
  id: number,
  amount: number,
  date: Date
}
export type BudgetHistoryType = HistoryType;

export type ExpensesHistoryType = {
  expenses: ExpensesCategoryWithPriceType[];
} & HistoryType;
