export type ExpenseCategory = 'Food' | 'Transport' | 'Wants' | 'Others';

export type ExpensesCategoryWithPrice = {
  category: ExpenseCategory;
  value: number;
}

export type ExpensesType = {
  id: number;
  value: number;
  category: ExpenseCategory;
};
