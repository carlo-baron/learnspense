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
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ExpensesHistoryType } from "../ExpensesCalculator";

export function ExpensesHistoryDialog({ history }: { history: ExpensesHistoryType[] }) {

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
            history.map((item, index) => {
              return (
                <CollapsibleItem
                  key={index}
                  trigger={item.date.toDateString()}
                >
                  <p className="lg font-semibold">Total: {item.total}</p>
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
}

export function CollapsibleItem({ trigger, children }: CollapsibleItemProps) {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button
          className='group w-full'
          variant='ghost'
        >
          {trigger}
          <HugeiconsIcon className='transition-transform group-data-[state=open]:rotate-180 ml-auto' icon={ArrowDown01Icon} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
