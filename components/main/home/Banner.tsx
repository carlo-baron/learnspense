"use client";
import { useMemo } from "react";
import { historySum } from "@/lib/historyHelper";
import { MoneyPreferenceDialog } from "./MoneyPreference";
import { useMonitorPreference, useBudgetHistory, useExpenseHistory } from "@/hooks/useAppDataStore";
import { DatePreference } from "@/types/monitorPreferenceTypes";

const MonitorDatePreferenceMap: Record<DatePreference, number> = {
  'Daily': 0,
  'Weekly': 6,
  'Monthly': 30,
  'Yearly': 364,
}

export function Banner() {
  const budgetHistory = useBudgetHistory();
  const expenseHistory = useExpenseHistory();
  const { datePreference, moneyPreference } = useMonitorPreference();

  const days = MonitorDatePreferenceMap[datePreference];

  const budget = useMemo(() => {
    return historySum(days, budgetHistory);
  }, [days, budgetHistory]);

  const expenses = useMemo(() => {
    return historySum(days, expenseHistory);
  }, [days, expenseHistory]);

  const money = useMemo(() => {
    return moneyPreference === 'Savings' ? budget - expenses : expenses;
  }, [moneyPreference, budget, expenses]);

  return (
    <section className="banner">
      <MoneyPreferenceDialog money={money} />
      <p
        className='text-center text-5xl font-extrabold'
      >P {money}</p>
    </section>
  );
}
