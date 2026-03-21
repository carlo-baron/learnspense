import {
  BudgetHistoryType,
  ExpensesHistoryType
} from "./historyTypes";
import { DatePreference, MoneyPreference } from "./monitorPreferenceTypes";

export type MonitorPreference = {
  datePreference: DatePreference;
  moneyPreference: MoneyPreference;
}

export type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
}

export type AppDataType = {
  budgetHistory: BudgetHistoryType[];
  expenseHistory: ExpensesHistoryType[];
  timestamps: Timestamps;
  monitorPreference: MonitorPreference
}
