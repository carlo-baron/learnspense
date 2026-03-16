import { sub, isWithinInterval } from "date-fns";

export type HistoryType = {
  amount: number,
  date: Date
}

export function getRecentHistory(days: number, historyArray: HistoryType[]) {
  const now = new Date();
  const intervalStart = sub(now, { days });

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
