"use client";
import { useEffect } from 'react';
import { isSameDay } from 'date-fns';
import { useAppData } from '@/hooks/useAppData';
export default function AppDataMaintenance() {
  const { appData, setAppData } = useAppData();
  useEffect(() => {
    function endDayCycle() {
      const now = new Date();
      const endOfDay = !isSameDay(appData.currentDayCycle, now);

      if (endOfDay) {
        const newTotalMoney = appData.totalMoney + appData.dailyBudget;
        const newTotalExpenses = appData.totalExpenses + appData.currentExpenses;
        const nextCycleAppData = {
          ...appData,
          totalMoney: newTotalMoney,
          totalExpenses: newTotalExpenses,
          dailyBudget: 0,
          currentExpenses: 0,
          currentDayCycle: now
        }

        setAppData(nextCycleAppData);
      }
    }

    const shortPoll = setInterval(endDayCycle, 60000);

    return () => {
      return clearInterval(shortPoll);
    }
  })

  return (<></>);
}
