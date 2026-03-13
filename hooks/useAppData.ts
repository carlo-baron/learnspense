"use client";
import { AppDataContext } from "@/providers/AppDataProvider"
import { useContext } from "react";

export const useAppData = () => {
  const appDataContext = useContext(AppDataContext);
  if (!appDataContext) {
    throw new Error(
      "useAppData has to be within <AppDataContext.Provider>"
    );
  }

  return appDataContext;
}
