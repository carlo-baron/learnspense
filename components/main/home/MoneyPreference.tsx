"use client";
import {
  Calendar02Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { DropdownRadio } from "../DropdownRadio";
import { useAppData } from "@/hooks/useAppData";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getRecentHistory, historySum } from "@/lib/historyHelper";

const dateOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'] as const;
export type DatePreference = typeof dateOptions[number];
const moneyOptions = ['Savings', 'Expenses'] as const;
export type MoneyPreference = typeof moneyOptions[number];

const MonitorDatePreferenceMap: Record<DatePreference, number> = {
  'Daily': 1,
  'Weekly': 7,
  'Monthly': 30,
  'Yearly': 365,
}

interface MoneyPreferenceDialogProps {
  onMoneyChange: (newMoney: number) => void;
}
export function MoneyPreferenceDialog({ onMoneyChange }: MoneyPreferenceDialogProps) {
  const { appData, setAppData } = useAppData();
  const monitorPreferences = appData.monitorPreference;
  const [datePref, setDatePref] = useState<DatePreference>(monitorPreferences.datePreference);
  const [moneyPref, setMoneyPref] = useState<MoneyPreference>(monitorPreferences.moneyPreference);
  const days = MonitorDatePreferenceMap[datePref];

  useEffect(() => {
    setAppData(prev => {
      return {
        ...prev,
        monitorPreference: {
          datePreference: datePref,
          moneyPreference: moneyPref
        }
      }
    });

  }, [setAppData, datePref, moneyPref])

  useEffect(() => {
    function initializePreference() {
      setDatePref(appData.monitorPreference.datePreference);
      setMoneyPref(appData.monitorPreference.moneyPreference);
    }
    initializePreference();
  }, [appData.monitorPreference]);


  const { budget } = useMemo(() => {
    const recent = getRecentHistory(days, appData.budgetHistory);
    return {
      budgetHistory: recent,
      budget: historySum(recent)
    };
  }, [days, appData.budgetHistory]);

  const { expenses } = useMemo(() => {
    const recent = getRecentHistory(days, appData.expenseHistory);
    return {
      expenses: historySum(recent)
    };
  }, [days, appData.expenseHistory]);

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
              onValueChange={setMoneyPref} />
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
