import { sub, isWithinInterval, startOfDay } from "date-fns";
import { HistoryType } from "@/types/historyTypes";

export function getRecentHistory(days: number, historyArray: HistoryType[]) {
  const now = new Date();
  const intervalStart = startOfDay(sub(now, { days }));

  const filteredHistory = historyArray.filter(history =>
    isWithinInterval(new Date(history.date), {
      start: intervalStart,
      end: now
    })
  );
  return filteredHistory;
}

export function historySum(historyArray: HistoryType[]) {
  const sum = historyArray.reduce(
    (acc, history) => acc + history.amount,
    0
  );

  return sum;
}
