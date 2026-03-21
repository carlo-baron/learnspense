"use client";
import { createContext, useEffect, useState } from "react";
import { saveAppData, getAppData, AppDataType, INITIALDATA } from "@/lib/appDataFunctions";

export type AppDataContextType = {
  appData: AppDataType;
  setAppData: React.Dispatch<React.SetStateAction<AppDataType>>;
};

export const AppDataContext = createContext<AppDataContextType>({
  appData: INITIALDATA,
  setAppData: () => { },
});

export default function AppDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [appData, setAppData] = useState<AppDataType>(INITIALDATA);

  useEffect(() => {
    function initialize() {
      const data = getAppData();
      setAppData(data);
    }

    initialize();
  }, []);

  useEffect(() => {
    const updatedAppData = { ...appData, timestamps: { createdAt: appData.timestamps.createdAt, updatedAt: new Date() } };
    saveAppData(updatedAppData);
  }, [appData]);

  return (
    <AppDataContext.Provider value={{ appData, setAppData }}>
      {children}
    </AppDataContext.Provider>
  );
}
