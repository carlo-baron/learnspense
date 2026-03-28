import { TotalCalculations } from "@/components/main/dashboard/TotalCalculations";
import { InfoCharts } from "@/components/main/dashboard/InfoChart";

export default function Dashboard() {
  return (
    <main
      className="p-4 w-full flex flex-col items-center"
    >
      <section
        className="w-full max-w-md main flex flex-col"
      >
        <h1
          className='font-semibold text-2xl'
        >Dashboard</h1>
        <TotalCalculations />
        <InfoCharts />
      </section>
    </main>
  );
}
