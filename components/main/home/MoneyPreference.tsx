"use client";
import {
  Calendar02Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DropdownRadio } from "../DropdownRadio";
import { useAppData } from "@/hooks/useAppData";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

const dateOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'] as const;
export type DatePreference = typeof dateOptions[number];
const moneyOptions = ['Savings', 'Expenses'] as const;
export type MoneyPreference = typeof moneyOptions[number];

export function MoneyPreferenceDialog() {
  const { appData, setAppData } = useAppData();
  const monitorPreferences = appData.monitorPreference;
  const [datePref, setDatePref] = useState<DatePreference>(monitorPreferences.datePreference);
  const [moneyPref, setMoneyPref] = useState<MoneyPreference>('Expenses');

  return (
    <span className="flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant='ghost'
            size='lg'
            className='ml-4 relative text-sm'
          >
            <h2>{datePref} {moneyPref}</h2>
            <HugeiconsIcon
              icon={Calendar02Icon}
            />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Money Preferences
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center preferences-dropdown">
            <DropdownRadio
              options={dateOptions}
              value={datePref}
              onValueChange={setDatePref}
            />
            <DropdownRadio
              options={moneyOptions}
              value={moneyPref}
              onValueChange={setMoneyPref} />
          </div>
          <p
            className='text-center text-6xl font-extrabold'
          >
            P 10,000
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  setAppData(prev => {
                    return {
                      ...prev,
                      monitorPreference: {
                        datePreference: datePref,
                        moneyPreference: moneyPref
                      }
                    }
                  })
                }}>
                Done
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </span>
  );
}
