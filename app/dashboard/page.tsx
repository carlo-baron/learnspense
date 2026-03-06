"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { TrendingUp } from "lucide-react";
import { 
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Dashboard(){
  return(
    <main
    className="p-4 w-full h-screen flex flex-col items-center"
    >
      <section 
      className="w-full max-w-lg main flex flex-col"
      >
        <h1
        className='font-semibold text-2xl'
        >Dashboard</h1>
        <TotalCalculations />
        <HistoryDialog />
        <Chart />
        
      </section>
    </main>
  );
}

function Chart(){
  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ]
  const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

  return(
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Linear</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

function HistoryDialog(){
  return(
    <section className="w-full flex justify-center history">
      <h2 className='flex'>History <HugeiconsIcon icon={ArrowRight01Icon}/></h2>
    </section>
  );
}

function TotalCalculations(){
  return(
    <section className="totals flex gap-4 w-full justify-center">
      <div className="total-expenses">
        <h2>Total Expenses</h2>
        <p className='font-extrabold text-2xl text-center'>P 1,000</p>
      </div>
      <div className="total-savings">
        <h2>Total Savings</h2>
        <p className='font-extrabold text-2xl text-center'>P 100</p>
      </div>
    </section>
  );
}
