"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
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
import { ExpenseCategory } from "@/types/expensesTypes";

interface ExpensesItemProps {
  onRemove: () => void;
  onChange: (value: number, category: ExpenseCategory) => void;
}

export function ExpensesItem(
  {
    onRemove,
    onChange
  }: ExpensesItemProps
) {
  const [category, setCategory] = useState<ExpenseCategory>('Food');
  const inputRef = useRef<HTMLInputElement | null>(null);

  function valueChanges(newCategory?: ExpenseCategory) {
    if (!inputRef.current) return;
    const value = inputRef.current.valueAsNumber;
    onChange(value, newCategory || category);
  }

  return (
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
        autoFocus
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
