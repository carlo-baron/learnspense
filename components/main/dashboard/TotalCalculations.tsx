"use client";
import {
  useBudgetHistory,
  useExpenseHistory,
} from "@/hooks/useAppDataStore";
import { historySum } from "@/lib/historyHelper";

export function TotalCalculations() {
  const expenseHistory = useExpenseHistory();
  const budgetHistory = useBudgetHistory();

  //temporary
  const days = 7;

  const expensesTotalToday = historySum(0, expenseHistory);
  const currentBudget = budgetHistory[0]?.amount ?? 0;

  const remainingBudget = currentBudget - expensesTotalToday;
  const totalBudget = historySum(days, budgetHistory);
  const totalExpenses = historySum(days, expenseHistory);

  return (
    <section className="grid grid-cols-2 grid-rows-3 totals gap-4">
      <div className='col-span-2 flex flex-col items-center'>
        <h2>Remaining Budget</h2>
        <p className='font-extrabold text-2xl'>P {remainingBudget}</p>
      </div>
      <div className='flex flex-col items-center'>
        <h2>Total Budget</h2>
        <p className='font-extrabold text-2xl'>P {totalBudget}</p>
      </div>
      <div className='flex flex-col items-center'>
        <h2>Total Expenses</h2>
        <p className='font-extrabold text-2xl'>P {totalExpenses}</p>
      </div>
      <div className='col-span-2 flex flex-col items-center'>
        <h2>Total Savings</h2>
        <p className='font-extrabold text-2xl'>P {totalBudget - totalExpenses}</p>
      </div>
    </section>
  );
}
