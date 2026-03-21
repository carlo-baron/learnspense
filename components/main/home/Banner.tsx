"use client";
import { useMemo } from "react";
import { getRecentHistory, historySum } from "@/lib/historyHelper";
import { MoneyPreferenceDialog } from "./MoneyPreference";
import { useMonitorPreference, useBudgetHistory, useExpenseHistory } from "@/hooks/useAppDataStore";
import { DatePreference } from "@/types/monitorPreferenceTypes";

const MonitorDatePreferenceMap: Record<DatePreference, number> = {
  'Daily': 0,
  'Weekly': 7,
  'Monthly': 30,
  'Yearly': 365,
}

export function Banner() {
  const budgetHistory = useBudgetHistory();
  const expenseHistory = useExpenseHistory();
  const { datePreference, moneyPreference } = useMonitorPreference();

  const days = MonitorDatePreferenceMap[datePreference];

  const { budget } = useMemo(() => {
    const recent = getRecentHistory(days, budgetHistory);
    return {
      budget: historySum(recent)
    };
  }, [days, budgetHistory]);

  const { expenses } = useMemo(() => {
    const recent = getRecentHistory(days, expenseHistory);
    return {
      expenses: historySum(recent)
    };
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
