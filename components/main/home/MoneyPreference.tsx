"use client";
import {
  Calendar02Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { DropdownRadio } from "../DropdownRadio";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useMonitorPreference,
  useUpdateDatePreference,
  useUpdateMoneyPreference,
} from "@/hooks/useAppDataStore";
import { moneyOptions, dateOptions } from "./Banner";

interface MoneyPreferenceDialogProps {
  money: number;
}

export function MoneyPreferenceDialog({ money }: MoneyPreferenceDialogProps) {
  const { datePreference, moneyPreference } = useMonitorPreference();
  const updateDatePreference = useUpdateDatePreference();
  const updateMoneyPreference = useUpdateMoneyPreference();

  return (
    <span className="flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant='ghost'
            size='lg'
            className='ml-4 relative text-sm'
          >
            <h2>{datePreference} {moneyPreference}</h2>
            <HugeiconsIcon
              icon={Calendar02Icon}
            />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Monitor Preferences
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center preferences-dropdown">
            <DropdownRadio
              options={dateOptions}
              value={datePreference}
              onValueChange={updateDatePreference}
            />
            <DropdownRadio
              options={moneyOptions}
              value={moneyPreference}
              onValueChange={updateMoneyPreference}
            />
          </div>
          <p
            className='text-center text-6xl font-extrabold'
          >
            P {money}
          </p>
        </DialogContent>
      </Dialog>
    </span>
  );
}
