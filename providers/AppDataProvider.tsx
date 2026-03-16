"use client";
import { createContext, useEffect, useState } from "react";
import { saveAppData, getAppData, AppDataType } from "@/lib/appDataFunctions";

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
