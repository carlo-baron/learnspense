"use client"

import { ExpensesHistoryType } from "@/types/historyTypes"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { getRecentHistory } from "@/lib/historyHelper"
import { ExpenseCategory, expenseCategories } from "@/types/expensesTypes"

export function HistoryBarChart({ history }: { history: ExpensesHistoryType[] }) {
  const recent = getRecentHistory(6, history);
  const formattedData = recent.flatMap(item => item.expenses);
  const groupedData = formattedData.reduce(
    (acc, item) => {
      const key = item.category;
      if (!acc[key]) {
        acc[key] = {
          category: key,
          amount: 0
        }
      }
      acc[key].amount += item.value;

      return acc;
    }, {} as Record<string, { category: ExpenseCategory, amount: number }>
  );

  expenseCategories.forEach(category => {
    if (!groupedData[category]) {
      groupedData[category] = { category, amount: 0 };
    }
  });

  const chartData = Object.values(groupedData);

  const chartConfig = {
    amount: {
      label: "Amount",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>Past 7 Days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="amount" fill="var(--chart-1)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
