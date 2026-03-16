import { ExpensesHistoryType } from "@/components/main/home/ExpensesCalculator";
import { DatePreference, MoneyPreference } from "@/components/main/home/MoneyPreference";
import { HistoryType } from "./historyHelper";

export type MonitorPreference = {
  datePreference: DatePreference;
  moneyPreference: MoneyPreference;
}
export type BudgetHistoryType = HistoryType;

export type AppDataType = {
  budgetHistory: BudgetHistoryType[];
  expenseHistory: ExpensesHistoryType[];
  createdAt: Date;
  updatedAt: Date;
  currentDayCycle: Date;
  monitorPreference: MonitorPreference
}

export const INITIALDATA: AppDataType = {
  budgetHistory: [],
  expenseHistory: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  currentDayCycle: new Date(),
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
