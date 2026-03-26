"use client";
import { HistoryChart } from "@/components/main/dashboard/SimpleChart";
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
      </TabsList>
      <TabsContent value='budget'>
        <HistoryChart history={budgetHistory} />
      </TabsContent>
      <TabsContent value='expenses'>
        <HistoryChart history={expenseHistory} />
      </TabsContent>
    </Tabs>
  );
}
