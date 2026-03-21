import { ExpensesHistoryType } from "@/components/main/home/ExpensesCalculator";
import { DatePreference, MoneyPreference } from "@/components/main/home/MoneyPreference";
import { HistoryType } from "./historyHelper";

export type MonitorPreference = {
  datePreference: DatePreference;
  moneyPreference: MoneyPreference;
}

export type BudgetHistoryType = HistoryType;

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

export const INITIALDATA: AppDataType = {
  budgetHistory: [],
  expenseHistory: [],
  timestamps: {
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  monitorPreference: {
    datePreference: 'Daily',
    moneyPreference: 'Savings'
  }
}

const DATANAME = "app_data";

export function initializeAppData(): AppDataType {
  localStorage.setItem(DATANAME, JSON.stringify(INITIALDATA));
  return INITIALDATA;
}

export function getAppData(): AppDataType {
  const raw = localStorage.getItem(DATANAME);
  return raw ? JSON.parse(raw) : initializeAppData();
}

export function saveAppData(newAppData: AppDataType) {
  const updatedAppData = { ...newAppData, updatedAt: new Date() };
  localStorage.setItem(DATANAME, JSON.stringify(updatedAppData));
}
