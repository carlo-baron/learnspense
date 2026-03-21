import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AppDataType, BudgetHistoryType } from "@/lib/appDataFunctions";
import { ExpensesHistoryType } from "@/components/main/home/ExpensesCalculator";
import { DatePreference, MoneyPreference } from "@/components/main/home/MoneyPreference";

interface AppDataStoreType extends AppDataType {
  budgetActions: {
    addBudgetHistory: (budget: BudgetHistoryType) => void;
    removeBudgetHistory: (id: number) => void;
    updateBudgetHistory: (id: number, newBudget: number) => void;
  },
  expenseActions: {
    addExpenseHistory: (budget: ExpensesHistoryType) => void;
    removeExpenseHistory: (id: number) => void;
  }
  monitorPreferenceActions: {
    updateDatePreference: (newPreference: DatePreference) => void;
    updateMoneyPreference: (newPreference: MoneyPreference) => void;
  }
};

const useAppDataStore = create<AppDataStoreType>()(
  persist(
    (set) => ({
      budgetHistory: [],
      expenseHistory: [],
      timestamps: {
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      monitorPreference: {
        datePreference: 'Daily',
        moneyPreference: 'Savings',
      },

      budgetActions: {
        addBudgetHistory: (budget) =>
          set((state) => ({
            budgetHistory: [budget, ...state.budgetHistory],
            timestamps: {
              ...state.timestamps,
              updatedAt: new Date(),
            },
          })),

        removeBudgetHistory: (id) =>
          set((state) => ({
            budgetHistory: state.budgetHistory.filter(
              (history) => history.id !== id
            ),
            timestamps: {
              ...state.timestamps,
              updatedAt: new Date(),
            },
          })),

        updateBudgetHistory: (id, newBudget) =>
          set((state) => ({
            budgetHistory: state.budgetHistory.map((history) =>
              history.id === id
                ? { ...history, amount: newBudget }
                : history
            ),
            timestamps: {
              ...state.timestamps,
              updatedAt: new Date(),
            },
          })),
      },

      expenseActions: {
        addExpenseHistory: (budget) =>
          set((state) => ({
            expenseHistory: [budget, ...state.expenseHistory],
            timestamps: {
              ...state.timestamps,
              updatedAt: new Date(),
            },
          })),

        removeExpenseHistory: (id) =>
          set((state) => ({
            expenseHistory: state.expenseHistory.filter(
              (history) => history.id !== id
            ),
            timestamps: {
              ...state.timestamps,
              updatedAt: new Date(),
            },
          })),
      },

      monitorPreferenceActions: {
        updateDatePreference: (newPreference) =>
          set((state) => ({
            monitorPreference: {
              ...state.monitorPreference,
              datePreference: newPreference,
            },
          })),

        updateMoneyPreference: (newPreference) =>
          set((state) => ({
            monitorPreference: {
              ...state.monitorPreference,
              moneyPreference: newPreference,
            },
          })),
      },
    }),
    { name: 'app_data' }
  )
);

// Budget
export const useBudgetHistory = () => useAppDataStore(state => state.budgetHistory);
export const useAddBudgetHistory = () => useAppDataStore(state => state.budgetActions.addBudgetHistory);
export const useRemoveBudgetHistory = () => useAppDataStore(state => state.budgetActions.removeBudgetHistory);
export const useUpdateBudgetHistory = () => useAppDataStore(state => state.budgetActions.updateBudgetHistory);

// Expense
export const useExpenseHistory = () => useAppDataStore(state => state.expenseHistory);
export const useAddExpenseHistory = () => useAppDataStore(state => state.expenseActions.addExpenseHistory);
export const useRemoveExpenseHistory = () => useAppDataStore(state => state.expenseActions.removeExpenseHistory);

// Monitor
export const useMonitorPreference = () => useAppDataStore(state => state.monitorPreference);
export const useUpdateDatePreference = () => useAppDataStore(state => state.monitorPreferenceActions.updateDatePreference);
export const useUpdateMoneyPreference = () => useAppDataStore(state => state.monitorPreferenceActions.updateMoneyPreference);

export const useTimestamps = () => useAppDataStore(state => state.timestamps);
