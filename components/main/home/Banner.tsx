"use client";
import { MoneyPreferenceDialog } from "./MoneyPreference";
import { useAppData } from "@/hooks/useAppData";

export function Banner() {
  const { appData } = useAppData();
  return (
    <section className="banner">
      <MoneyPreferenceDialog />
      <p
        className='text-center text-5xl font-extrabold'
      >P {appData.totalExpenses}</p>
    </section>
  );
}
