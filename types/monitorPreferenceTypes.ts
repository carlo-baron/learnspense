export const dateOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'] as const;
export type DatePreference = typeof dateOptions[number];
export const moneyOptions = ['Savings', 'Expenses'] as const;
export type MoneyPreference = typeof moneyOptions[number];
