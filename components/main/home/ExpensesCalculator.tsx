"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  TransactionHistoryIcon,
  ArrowDown01Icon,
  Minus
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react";

type ExpensesType = {
  id: number;
  value: number;
  category: 'Food' | 'Transport' | 'Wants' | 'Others';
}

export function ExpensesCalculator(){
  const [expenses, setExpenses] = useState<ExpensesType[]>([{id: 0, value: 0, category: 'Food'}]);

  return(
    <section className="expenses">
      <span className="flex items-center">
        <h2>Expenses</h2>
        <Button variant='ghost'>
          <HugeiconsIcon icon={TransactionHistoryIcon} />
        </Button>
      </span>
      <section className="flex flex-col gap-4 expense-item">
        <ol className='flex flex-col gap-2'>
            {
              expenses.map(expense => {
                return(
                  <li
                  key={expense.id}
                  >
                    <ExpensesItem 
                    onRemove={()=>{
                      const updated = expenses.filter(item => item.id !== expense.id)
                      setExpenses(updated);
                    }}
                    onChange={(value) => {
                      setExpenses(prev =>
                        prev.map(item =>
                          item.id === expense.id ? { ...item, value } : item
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
          onClick={()=>{
            setExpenses(prev=>[...prev, {id: prev.length + 1, value: 0, category: 'Food'}]);
          }}
          >
            Add
          </Button>
          <Button onClick={() => console.log(expenses)}>
            Calculate
          </Button>
        </div>
      </section>
    </section>
  );
}

interface ExpensesItemProps{
  onRemove: () => void;
  onChange: (value: number) => void;
}

function ExpensesItem(
  {
    onRemove,
    onChange
  }:ExpensesItemProps
){
  return(
    <span className='flex items-center gap-2'>
      <Button 
      variant='outline'
      onClick={onRemove}
      >
        <HugeiconsIcon icon={Minus} />
      </Button>
      <Input 
      type='number'
      onChange={(e) => onChange(e.target.valueAsNumber || 0)}
      />
      <Button>
        Food
        <HugeiconsIcon icon={ArrowDown01Icon} />
      </Button>
    </span>
  );
}
