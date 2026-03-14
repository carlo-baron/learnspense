"use client";
import { createContext, useEffect, useState } from "react";
import { saveAppData, getAppData, AppDataType } from "@/lib/appDataFunctions";

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

export type AppDataContextType = {
  appData: AppDataType;
  setAppData: React.Dispatch<React.SetStateAction<AppDataType>>;
};

export const AppDataContext = createContext<AppDataContextType>({
  appData: initialData,
  setAppData: () => { },
});

export default function AppDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [appData, setAppData] = useState<AppDataType>(initialData);

  useEffect(() => {
    function initialize() {
      const data = getAppData();
      setAppData(data);
    }

    initialize();
  }, []);

  useEffect(() => {
    saveAppData(appData);
  }, [appData]);

  return (
    <AppDataContext.Provider value={{ appData, setAppData }}>
      {children}
    </AppDataContext.Provider>
  );
}
