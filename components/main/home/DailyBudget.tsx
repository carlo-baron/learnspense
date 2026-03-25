"use client";
import { isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pen, Check } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState, useEffect, useRef } from "react";
import {
  useBudgetHistory,
  useExpenseHistory,
  useAddBudgetHistory,
  useUpdateBudgetHistory,
  useRemoveBudgetHistory,
} from "@/hooks/useAppDataStore";
import { BudgetHistoryDialog } from "./Budget/BudgetHistoryDialog";
import { historySum } from "@/lib/historyHelper";

export function DailyBudget() {
  const budgetHistory = useBudgetHistory();
  const expenseHistory = useExpenseHistory();

  const addBudgetHistory = useAddBudgetHistory();
  const updateBudgetHistory = useUpdateBudgetHistory();
  const removeBudgetHistory = useRemoveBudgetHistory();

  const expensesTotalToday = historySum(0, expenseHistory);
  const currentBudget = budgetHistory[0]?.amount ?? 0;

  const remainingBudget = currentBudget - expensesTotalToday;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [edit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState<number>(currentBudget);

  useEffect(() => {
    const today = new Date();

    const todayEntry = budgetHistory.find((history) =>
      isSameDay(new Date(history.date), today)
    );

    if (!todayEntry) {
      addBudgetHistory({
        id: Date.now(),
        amount: 0,
        date: today,
      });
    }
  }, [budgetHistory, addBudgetHistory]);

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

      if (newValue <= 0) {
        const todayEntry = budgetHistory.find((history) =>
          isSameDay(new Date(history.date), today)
        );

        if (todayEntry) {
          removeBudgetHistory(todayEntry.id);
        }
        return;
      }

      const todayEntry = budgetHistory.find((history) =>
        isSameDay(new Date(history.date), today)
      );

      if (todayEntry) {
        updateBudgetHistory(todayEntry.id, newValue);
      } else {
        addBudgetHistory({
          id: Date.now(),
          amount: newValue,
          date: today,
        });
      }
    }
  }

  return (
    <section className="flex flex-col items-center text-center budget">
      <div className="budget">
        <span className="items-center flex">
          <h2>Todays Budget</h2>
          <BudgetHistoryDialog history={budgetHistory} />
        </span>

        <span className="relative flex w-fit">
          <Input
            ref={inputRef}
            className="w-40 text-center"
            value={inputValue}
            onChange={(e) =>
              setInputValue(Number(e.target.value))
            }
            type="number"
            disabled
          />

          <Button onClick={editBudget} className="absolute -right-10">
            {!edit ? (
              <HugeiconsIcon icon={Pen} />
            ) : (
              <HugeiconsIcon icon={Check} />
            )}
          </Button>
        </span>
      </div>

      <div>
        <h3>Remaining Budget</h3>
        <p className="font-semibold text-2xl">
          P {remainingBudget}
        </p>
      </div>
    </section>
  );
}
