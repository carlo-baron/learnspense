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
    <section className="flex flex-col items-center text-center budget">
      <div className="budget">
        <h2>Todays Budget</h2>            
        <span
        className='relative flex w-fit'
        >
          <Input 
          ref={inputRef}
          className='w-40 text-center'
          defaultValue={200}
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
        <p className='font-semibold text-2xl'>P 20</p>
      </div>
    </section>
  );
}
