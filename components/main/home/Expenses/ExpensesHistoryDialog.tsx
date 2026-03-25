"use client";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  TransactionHistoryIcon,
  ArrowDown01Icon,
  RestoreBinIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ExpensesHistoryType } from "@/types/historyTypes";
import { useRemoveExpenseHistory } from "@/hooks/useAppDataStore";
import { ConfirmationDialog } from "../../ConfirmationDialog";

export function ExpensesHistoryDialog({ history }: { history: ExpensesHistoryType[] }) {
  const removeExpenseHistory = useRemoveExpenseHistory();

  function restoreExpenses(expenseHistory: ExpensesHistoryType) {
    removeExpenseHistory(expenseHistory.id);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>
          <HugeiconsIcon icon={TransactionHistoryIcon} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Expenses History
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-64 overflow-auto history">
          {
            history.map((item) => {
              return (
                <CollapsibleItem
                  key={item.id}
                  trigger={new Date(item.date).toDateString()}
                  onRestore={() => restoreExpenses(item)}
                >
                  <p className="lg font-semibold">Total: {item.amount}</p>
                  {
                    item.expenses.map((expense, index) => {
                      return (
                        <p key={index}>{expense.category}: {expense.value}</p>
                      );
                    })
                  }
                </CollapsibleItem>
              )
            })
          }
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface CollapsibleItemProps {
  trigger: string;
  children: React.ReactNode
  onRestore: () => void;
}

export function CollapsibleItem({ trigger, children, onRestore }: CollapsibleItemProps) {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <span className='flex'>
          <ConfirmationDialog
            onContinue={onRestore}
            description="This will permanently remove the expense history. You also cannot add back expenses for that date (if its the past)."
          >
            <Button
              variant='ghost'
            >
              <HugeiconsIcon icon={RestoreBinIcon} />
            </Button>
          </ConfirmationDialog>
          <Button
            className='group flex-1'
            variant='ghost'
          >
            {trigger}
            <HugeiconsIcon className='transition-transform group-data-[state=open]:rotate-180 ml-auto' icon={ArrowDown01Icon} />
          </Button>
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
