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
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ExpensesHistoryType } from "../ExpensesCalculator";
import { useAppData } from "@/hooks/useAppData";
import { isSameDay } from "date-fns";

export function ExpensesHistoryDialog({ history }: { history: ExpensesHistoryType[] }) {
  const { appData, setAppData } = useAppData();

  function restoreExpenses(expenseHistory: ExpensesHistoryType) {
    const updatedExpenseHistory = [...appData.expenseHistory].filter(history => history !== expenseHistory);

    setAppData(prev => {
      return {
        ...prev,
        expenseHistory: updatedExpenseHistory
      };
    });
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
        <div className="history">
          {
            [...history].reverse().map((item, index) => {
              return (
                <CollapsibleItem
                  key={index}
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
          <Button
            variant='ghost'
            onClick={(e) => {
              e.preventDefault();
              onRestore();
            }}
          >
            <HugeiconsIcon icon={RestoreBinIcon} />
          </Button>
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
