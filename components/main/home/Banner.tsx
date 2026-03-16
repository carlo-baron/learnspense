"use client";
import { MoneyPreferenceDialog } from "./MoneyPreference";
import { useAppData } from "@/hooks/useAppData";
import { DatePreference, MoneyPreference } from "./MoneyPreference";

const MonitorDatePreferenceMap: Record<DatePreference, number> = {
  'Daily': 1,
  'Weekly': 7,
  'Monthly': 30,
  'Yearly': 365,
}

export function Banner() {
  const { appData } = useAppData();
  const totalExpenses = appData.expenseHistory.reduce((acc, history) => acc + history.amount, 0);

  function monitorValue() {

  }

  return (
    <section className="banner">
      <MoneyPreferenceDialog />
      <p
        className='text-center text-5xl font-extrabold'
      >P {totalExpenses}</p>
    </section>
  );
}
