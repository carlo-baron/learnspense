export const expenseCategories = ['Food', 'Transport', 'Wants', 'Others'] as const;
export type ExpenseCategory = typeof expenseCategories[number];

export type ExpensesCategoryWithPriceType = {
  category: ExpenseCategory;
  value: number;
}

export type ExpensesType = {
  id: number;
  value: number;
  category: ExpenseCategory;
};
