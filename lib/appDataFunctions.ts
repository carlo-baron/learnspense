export type AppDataType = {
  totalMoney: number;
  totalExpenses: number;
  dailyBudget: number;
}

const DATANAME = "app_data";

export function initializeAppData(): AppDataType {
  const initialData: AppDataType = {
    totalMoney: 0,
    totalExpenses: 0,
    dailyBudget: 200
  }

  localStorage.setItem(DATANAME, JSON.stringify(initialData));
  return initialData;
}

export function getAppData(): AppDataType {
  const raw = localStorage.getItem(DATANAME);
  return raw ? JSON.parse(raw) : initializeAppData();
}

export function saveAppData(newAppData: AppDataType) {
  console.log(newAppData)
  localStorage.setItem(DATANAME, JSON.stringify(newAppData));
}
