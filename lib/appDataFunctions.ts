import { ExpensesHistoryType } from "@/components/main/home/ExpensesCalculator";
import { DatePreference, MoneyPreference } from "@/components/main/home/MoneyPreference";

export type MonitorPreference = {
  datePreference: DatePreference;
  moneyPreference: MoneyPreference;
}
export type BudgetHistoryType = {
  date: Date,
  amount: number
}

export type AppDataType = {
  budgetHistory: BudgetHistoryType[];
  expenseHistory: ExpensesHistoryType[];
  createdAt: Date;
  updatedAt: Date;
  currentDayCycle: Date;
  monitorPreference: MonitorPreference
}

const DATANAME = "app_data";

export function initializeAppData(): AppDataType {
  const initialData: AppDataType = {
    budgetHistory: [],
    expenseHistory: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    currentDayCycle: new Date(),
    monitorPreference: {
      datePreference: 'Daily',
      moneyPreference: 'Expenses'
    }
  }

  localStorage.setItem(DATANAME, JSON.stringify(initialData));
  return initialData;
}

export function getAppData(): AppDataType {
  const raw = localStorage.getItem(DATANAME);
  return raw ? JSON.parse(raw) : initializeAppData();
}

export function saveAppData(newAppData: AppDataType) {
  const updatedAppData = { ...newAppData, updatedAt: new Date() };
  localStorage.setItem(DATANAME, JSON.stringify(updatedAppData));
}
