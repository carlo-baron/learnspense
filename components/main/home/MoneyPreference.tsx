"use client";
import {
  Calendar02Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { DropdownRadio } from "../DropdownRadio";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getRecentHistory, historySum } from "@/lib/historyHelper";

import {
  useBudgetHistory,
  useExpenseHistory,
  useMonitorPreference,
  useUpdateDatePreference,
  useUpdateMoneyPreference,
} from "@/hooks/useAppDataStore";

const dateOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'] as const;
export type DatePreference = typeof dateOptions[number];
const moneyOptions = ['Savings', 'Expenses'] as const;
export type MoneyPreference = typeof moneyOptions[number];

const MonitorDatePreferenceMap: Record<DatePreference, number> = {
  'Daily': 0,
  'Weekly': 7,
  'Monthly': 30,
  'Yearly': 365,
}

interface MoneyPreferenceDialogProps {
  onMoneyChange: (newMoney: number) => void;
}

export function MoneyPreferenceDialog({ onMoneyChange }: MoneyPreferenceDialogProps) {
  const budgetHistory = useBudgetHistory();
  const expenseHistory = useExpenseHistory();
  const monitorPreferences = useMonitorPreference();

  const updateDatePreference = useUpdateDatePreference();
  const updateMoneyPreference = useUpdateMoneyPreference();

  const [datePref, setDatePref] = useState<DatePreference>(monitorPreferences.datePreference);
  const [moneyPref, setMoneyPref] = useState<MoneyPreference>(monitorPreferences.moneyPreference);

  const days = MonitorDatePreferenceMap[datePref];

  useEffect(() => {
    updateDatePreference(datePref);
    updateMoneyPreference(moneyPref);
  }, [datePref, moneyPref, updateDatePreference, updateMoneyPreference]);

  useEffect(() => {
    setDatePref(monitorPreferences.datePreference);
    setMoneyPref(monitorPreferences.moneyPreference);
  }, [monitorPreferences]);

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
    return moneyPref === 'Savings' ? budget - expenses : expenses;
  }, [moneyPref, budget, expenses]);

  useEffect(() => {
    onMoneyChange(money);
  }, [money, onMoneyChange]);

  return (
    <span className="flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant='ghost'
            size='lg'
            className='ml-4 relative text-sm'
          >
            <h2>{datePref} {moneyPref}</h2>
            <HugeiconsIcon
              icon={Calendar02Icon}
            />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Money Preferences
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center preferences-dropdown">
            <DropdownRadio
              options={dateOptions}
              value={datePref}
              onValueChange={setDatePref}
            />
            <DropdownRadio
              options={moneyOptions}
              value={moneyPref}
              onValueChange={setMoneyPref}
            />
          </div>
          <p
            className='text-center text-6xl font-extrabold'
          >
            P {money}
          </p>
        </DialogContent>
      </Dialog>
    </span>
  );
}
