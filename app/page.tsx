import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Pen,
  TransactionHistoryIcon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react"

export default function Page() {
  return(
    <main
    className="p-4 w-full h-screen flex flex-col align-center"
    >
      <h1
      className='font-semibold text-2xl'
      >Home</h1>
      <section 
      className="main flex flex-col items-center justify-center"
      >
        <Banner />
        <DailyBudget />
        <ExpensesCalculator />
      </section>
    </main>
  );
}

function ExpensesCalculator(){
  return(
    <section className="expenses">
      <span className="flex items-center">
        <h2>Expenses</h2>
        <Button variant='ghost'>
          <HugeiconsIcon icon={TransactionHistoryIcon} />
        </Button>
      </span>
      <section className="flex flex-col gap-4 expense-item">
        <ol>
          <li>
            <span className='flex items-center gap-2'>
              <p>1</p>
              <Input />
              <Button>
                Food
                <HugeiconsIcon icon={ArrowDown01Icon} />
              </Button>
            </span>
          </li>
        </ol>
        <div className='flex flex-col gap-2'>
          <Button
          variant='outline'
          >
            Add
          </Button>
          <Button>
            Calculate
          </Button>
        </div>
      </section>
    </section>
  );
}

function DailyBudget(){
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

function Banner(){
  return(
    <section className="banner">
      <h2
      className="text-center"
      >Weekly Savings</h2>
      <p
      className='text-4xl font-extrabold'
      >P 10,000</p>
    </section>
  );
}
