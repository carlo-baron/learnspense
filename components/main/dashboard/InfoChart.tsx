"use client";
import { HistoryLineChart } from "./HistoryLineChart";
import { HistoryBarChart } from "./HistoryBarChart";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  useBudgetHistory,
  useExpenseHistory
} from "@/hooks/useAppDataStore";

export function InfoCharts() {
  const budgetHistory = useBudgetHistory();
  const expenseHistory = useExpenseHistory();

  return (
    <Tabs defaultValue='budget'>
      <TabsList>
        <TabsTrigger value='budget'>Budget</TabsTrigger>
        <TabsTrigger value='expenses'>Expenses</TabsTrigger>
        <TabsTrigger value='categories'>Categories</TabsTrigger>
      </TabsList>
      <TabsContent value='budget'>
        <HistoryLineChart history={budgetHistory} />
      </TabsContent>
      <TabsContent value='expenses'>
        <HistoryLineChart history={expenseHistory} />
      </TabsContent>
      <TabsContent value='categories'>
        <HistoryBarChart history={expenseHistory} />
      </TabsContent>
    </Tabs>
  );
}
