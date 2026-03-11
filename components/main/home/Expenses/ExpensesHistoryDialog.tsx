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

export function ExpensesHistoryDialog() {
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
          <CollapsibleItem
            data={
              {
                trigger: "Test",
                content: "Testing"
              }
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

type CollapsibleItemData = {
  trigger: string,
  content: React.ReactNode
}
interface CollapsibleItemProps {
  data: CollapsibleItemData;
}

export function CollapsibleItem({ data }: CollapsibleItemProps) {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant='ghost'>
          {data.trigger}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {data.content}
      </CollapsibleContent>
    </Collapsible>
  );
}
