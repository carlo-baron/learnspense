import { Banner } from "@/components/main/home/Banner";
import { DailyBudget } from "@/components/main/home/DailyBudget";
import { ExpensesCalculator } from "@/components/main/home/ExpensesCalculator";

export default function Page() {
  return (
    <main
      className="p-4 w-full h-screen flex flex-col items-center"
    >
      <section
        className="gap-4 w-full max-w-md main flex flex-col"
      >
        <h1
          className='font-semibold text-2xl'
        >Home</h1>
        <Banner />
        <DailyBudget />
        <ExpensesCalculator />
      </section>
    </main>
  );
}
