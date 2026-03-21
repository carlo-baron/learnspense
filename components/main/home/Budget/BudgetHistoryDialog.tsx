"use client";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { TransactionHistoryIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { BudgetHistoryType } from "@/lib/appDataFunctions";

import { useUpdateBudgetHistory } from "@/hooks/useAppDataStore";

export function BudgetHistoryDialog({ history }: { history: BudgetHistoryType[] }) {
  const updateBudgetHistory = useUpdateBudgetHistory();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <HugeiconsIcon icon={TransactionHistoryIcon} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Budget History</DialogTitle>
        </DialogHeader>

        <div className="history">
          {[...history].map((item) => {
            return (
              <span
                key={item.id}
                className="items-center flex gap-2"
              >
                <p className="lg font-semibold">
                  P {item.amount},
                </p>
                <p>{new Date(item.date).toDateString()}</p>

                <EditBudgetAmountDialog
                  history={item}
                  onChange={(val) =>
                    updateBudgetHistory(item.id, val)
                  }
                />
              </span>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface EditBudgetAmountDialogProps {
  history: BudgetHistoryType;
  onChange: (val: number) => void;
}

function EditBudgetAmountDialog({
  history,
  onChange,
}: EditBudgetAmountDialogProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto">Edit</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Budget Amount</DialogTitle>
        </DialogHeader>

        <Input
          ref={inputRef}
          type="number"
          defaultValue={history.amount}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              onClick={() => {
                if (!inputRef.current) return;
                onChange(inputRef.current.valueAsNumber);
              }}
            >
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
