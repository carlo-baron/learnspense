"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  ExpenseCategory,
  ExpensesItem,
} from "./Expenses/ExpensesItem";
import { ExpensesHistoryDialog } from "./Expenses/ExpensesHistoryDialog";

import {
  useExpenseHistory,
  useAddExpenseHistory,
} from "@/hooks/useAppDataStore";

import { HistoryType } from "@/lib/historyHelper";

interface ExpensesCategoryWithPrice {
  category: ExpenseCategory;
  value: number;
}

export type ExpensesHistoryType = {
  expenses: ExpensesCategoryWithPrice[];
} & HistoryType;

type ExpensesType = {
  id: number;
  value: number;
  category: ExpenseCategory;
};

export function ExpensesCalculator() {
  const expenseHistory = useExpenseHistory();
  const addExpenseHistory = useAddExpenseHistory();

  const [expenses, setExpenses] = useState<ExpensesType[]>([
    { id: 0, value: 0, category: "Food" },
  ]);

  function filterExpenses() {
    return expenses.filter((expense) => expense.value > 0);
  }

  function onCalculate() {
    const filteredExpenses = filterExpenses();

    const totalCalculatedExpenses = filteredExpenses.reduce(
      (accumulator, expense) => accumulator + expense.value,
      0
    );

    const expensesNoId = filteredExpenses.map(
      ({ id, ...expense }) => expense
    );

    const newHistory: ExpensesHistoryType = {
      id: Date.now(),
      date: new Date(),
      amount: totalCalculatedExpenses,
      expenses: expensesNoId,
    };

    addExpenseHistory(newHistory);
    setExpenses([]);
  }

  return (
    <section className="expenses">
      <span className="flex items-center">
        <h2>Expenses</h2>
        <ExpensesHistoryDialog history={expenseHistory} />
      </span>

      <section className="flex flex-col gap-4 expense-item">
        <ol className="flex flex-col gap-2">
          {expenses.map((expense) => {
            return (
              <li key={expense.id}>
                <ExpensesItem
                  onRemove={() => {
                    const updated = expenses.filter(
                      (item) => item.id !== expense.id
                    );
                    setExpenses(updated);
                  }}
                  onChange={(value, category) => {
                    setExpenses((prev) =>
                      prev.map((item) =>
                        item.id === expense.id
                          ? { id: item.id, value, category }
                          : item
                      )
                    );
                  }}
                />
              </li>
            );
          })}
        </ol>

        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setExpenses((prev) => [
                ...prev,
                {
                  id: prev.length + 1,
                  value: 0,
                  category: "Food",
                },
              ]);
            }}
          >
            Add
          </Button>

          <Button
            onClick={onCalculate}
            disabled={filterExpenses().length <= 0}
          >
            Calculate
          </Button>
        </div>
      </section>
    </section>
  );
}
