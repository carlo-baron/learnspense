import { ExpensesHistoryType } from "@/components/main/home/ExpensesCalculator";
export type AppDataType = {
  totalMoney: number;
  totalExpenses: number;
  dailyBudget: number;
  currentExpenses: number;
  history: ExpensesHistoryType[];
  createdAt: Date;
  updatedAt: Date;
  currentDayCycle: Date;
}

const DATANAME = "app_data";

export function initializeAppData(): AppDataType {
  const initialData: AppDataType = {
    totalMoney: 0,
    totalExpenses: 0,
    dailyBudget: 0,
    currentExpenses: 0,
    history: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    currentDayCycle: new Date(),
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
