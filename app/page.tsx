import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Pen,
  TransactionHistoryIcon,
  ArrowDown01Icon,
  Home01Icon,
  DashboardSquare02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

export default function Page() {
  return(
    <main
    className="w-full h-screen flex flex-col align-center"
    >
      <Navbar />
      <section 
      className="main flex flex-col items-center"
      >
        <Banner />
        <DailyBudget />
        <ExpensesCalculator />
      </section>
    </main>
  );
}

function Navbar(){
  return(
    <nav
    className='px-4 flex justify-center items-center h-8 w-full relative top-0'
    >
      <p className='absolute left-4'>LearnSpense</p>
      <Tabs defaultValue='home'>
        <TabsList>
          <TabsTrigger
          value='home'
          >
            <HugeiconsIcon icon={Home01Icon} />
          </TabsTrigger>
          <TabsTrigger
          value='dashboard'
          >
            <HugeiconsIcon icon={DashboardSquare02Icon} />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </nav>
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
      <h1
      className="text-center"
      >Weekly Savings</h1>
      <p
      className='text-4xl font-bold'
      >P 10,000</p>
    </section>
  );
}
