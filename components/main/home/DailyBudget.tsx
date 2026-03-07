import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Pen,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react"

export function DailyBudget(){

  return(
    <section className="text-center budget">
      <h2>Todays Budget</h2>            
      <span
      className='flex'
      >
        <Input 
        value={200}
        disabled
        />
        <Button>
          <HugeiconsIcon icon={Pen} />
        </Button>
      </span>
    </section>
  );
}
