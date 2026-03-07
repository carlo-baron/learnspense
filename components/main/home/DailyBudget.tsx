"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Pen,
  Check
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react"
import { useState, useRef } from "react";

export function DailyBudget(){
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [edit, setEdit] = useState(false);

  function editBudget(){
    if(!inputRef.current) return;
    if(!edit){
      setEdit(true);
      inputRef.current.disabled = false;
      inputRef.current.focus();
    }else{
      setEdit(false);
      inputRef.current.disabled = true;
      // save
    }
  }

  return(
    <section className="text-center budget">
      <h2>Todays Budget</h2>            
      <span
      className='flex'
      >
        <Input 
        ref={inputRef}
        className='text-center'
        defaultValue={200}
        type='number'
        disabled
        />
        <Button
        onClick={editBudget}
        >
          {
            !edit ?
              <HugeiconsIcon icon={Pen} />
            :
              <HugeiconsIcon icon={Check} />
          }
        </Button>
      </span>
      <h3>Remaining</h3>
      <p className='font-semibold text-2xl'>P 20</p>
    </section>
  );
}
