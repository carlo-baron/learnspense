"use client";
import { isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pen,
  Check
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react"
import { useState, useRef } from "react";
import { useAppData } from "@/hooks/useAppData";

export function DailyBudget() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [edit, setEdit] = useState(false);
  const { appData, setAppData } = useAppData();

  function editBudget() {
    if (!inputRef.current) return;
    if (!edit) {
      setEdit(true);
      inputRef.current.disabled = false;
      inputRef.current.focus();
    } else {
      setEdit(false);
      inputRef.current.disabled = true;

      const newValue = inputRef.current.valueAsNumber;
      const today = new Date();
      let found = false;

      const updatedBudgetHistory = appData.budgetHistory.map(history => {
        if (isSameDay(history.date, today)) {
          found = true;
          return { ...history, amount: newValue }
        }
        return history;
      })

      if (!found) {
        updatedBudgetHistory.push({ amount: newValue, date: today });
      }

      setAppData(prev => ({ ...prev, budgetHistory: updatedBudgetHistory }));
    }
  }

  return (
    <section className="flex flex-col items-center text-center budget">
      <div className="budget">
        <h2>Todays Budget</h2>
        <span
          className='relative flex w-fit'
        >
          <Input
            ref={inputRef}
            className='w-40 text-center'
            defaultValue={appData.budgetHistory[0]?.amount ?? 0}
            type='number'
            disabled
          />
          <Button
            onClick={editBudget}
            className='absolute -right-10'
          >
            {
              !edit ?
                <HugeiconsIcon icon={Pen} />
                :
                <HugeiconsIcon icon={Check} />
            }
          </Button>
        </span>
      </div>
      <div>
        <h3>Remaining Budget</h3>
        <p className='font-semibold text-2xl'>P {appData.budgetHistory.length > 0 && appData.expenseHistory.length > 0 ? appData.budgetHistory[0].amount - appData.expenseHistory[0].amount : 0}</p>
      </div>
    </section>
  );
}
