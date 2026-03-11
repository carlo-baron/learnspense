"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  ExpenseCategory,
  ExpensesItem,
} from "./Expenses/ExpensesItem";
import { ExpensesHistoryDialog } from "./Expenses/ExpensesHistoryDialog";

type ExpensesType =
  {
    id: number;
    value: number;
    category: ExpenseCategory;
  }

export function ExpensesCalculator() {
  const [expenses, setExpenses] = useState<ExpensesType[]>([{ id: 0, value: 0, category: 'Food' }]);

  return (
    <section className="expenses">
      <span className="flex items-center">
        <h2>Expenses</h2>
        <ExpensesHistoryDialog />
      </span>
      <section className="flex flex-col gap-4 expense-item">
        <ol className='flex flex-col gap-2'>
          {
            expenses.map(expense => {
              return (
                <li
                  key={expense.id}
                >
                  <ExpensesItem
                    onRemove={() => {
                      const updated = expenses.filter(item => item.id !== expense.id)
                      setExpenses(updated);
                    }}
                    onChange={(value, category) => {
                      setExpenses(prev =>
                        prev.map(item =>
                          item.id === expense.id ? { id: item.id, value, category } : item
                        )
                      );
                    }}
                  />
                </li>
              );
            })
          }
        </ol>
        <div className='flex flex-col gap-2'>
          <Button
            variant='outline'
            onClick={() => {
              setExpenses(prev => [...prev, { id: prev.length + 1, value: 0, category: 'Food' }]);
            }}
          >
            Add
          </Button>
          <Button onClick={() => console.log(expenses.filter(expense => expense.value > 0))}>
            Calculate
          </Button>
        </div>
      </section>
    </section>
  );
}
