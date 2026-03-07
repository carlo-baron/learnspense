"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  TransactionHistoryIcon,
  ArrowDown01Icon,
  Minus
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react"
import { useState, useRef } from "react";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

type ExpenseCategory = 'Food' | 'Transport' | 'Wants' | 'Others';
type ExpensesType = {
  id: number;
  value: number;
  category: ExpenseCategory;
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
          onClick={()=>{
            setExpenses(prev=>[...prev, {id: prev.length + 1, value: 0, category: 'Food'}]);
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

interface ExpensesItemProps{
  onRemove: () => void;
  onChange: (value: number, category: ExpenseCategory) => void;
}

function ExpensesItem(
  {
    onRemove,
    onChange
  }:ExpensesItemProps
){
  const [category, setCategory] = useState<ExpenseCategory>('Food');
  const inputRef = useRef<HTMLInputElement | null>(null);

  function valueChanges(newCategory?: ExpenseCategory){
    if(!inputRef.current) return;
    const value = inputRef.current.valueAsNumber;
    onChange(value, newCategory || category);
  }

  return(
    <span className='flex items-center gap-2'>
      <Button 
      variant='outline'
      onClick={onRemove}
      >
        <HugeiconsIcon icon={Minus} />
      </Button>
      <Input 
      ref={inputRef}
      type='number'
      onChange={() => valueChanges()}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            {category} 
            <HugeiconsIcon icon={ArrowDown01Icon} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              Categories
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup 
            value={category}
            onValueChange={(newCategory) => {
              const category = newCategory as ExpenseCategory 
              valueChanges(category);
              setCategory(category)
            }}
            >
              <DropdownMenuRadioItem value='Food'>Food</DropdownMenuRadioItem>            
              <DropdownMenuRadioItem value='Transport'>Transport</DropdownMenuRadioItem>            
              <DropdownMenuRadioItem value='Wants'>Wants</DropdownMenuRadioItem>            
              <DropdownMenuRadioItem value='Others'>Others</DropdownMenuRadioItem>            
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </span>
  );
}
