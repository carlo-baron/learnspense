import { 
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button";

export function Banner(){
  return(
    <section className="banner">
      <span className="flex justify-center">
        <Button 
        variant='ghost'
        size='lg'
        className='text-sm'
        >
          <h2>Weekly Savings </h2>
          <HugeiconsIcon icon={ArrowDown01Icon}/>
        </Button>
      </span>
      <p
      className='text-5xl font-extrabold'
      >P 10,000</p>
    </section>
  );
}
