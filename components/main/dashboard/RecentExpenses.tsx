"use client";
import { 
	Card,
	CardDescription,
	CardContent,
	CardHeader,
	CardTitle,
	CardAction
} from "@/components/ui/card";
import { 
	useExpenseHistory,
	useRemoveExpenseHistory
} from "@/hooks/useAppDataStore";
import { Button } from "@/components/ui/button";
import { ExpensesHistoryDialog } from "../home/Expenses/ExpensesHistoryDialog";
import { CollapsibleItem } from "../home/Expenses/ExpensesHistoryDialog";
import { QuickAddExpenseDialog } from "./QuickAddExpenseDialog";

export function RecentExpenses(){
	const expenseHistory = useExpenseHistory();
	const removeExpenseHistory = useRemoveExpenseHistory();

	return(
		<Card>
			<CardHeader>
				<CardTitle>
				Recent Expenses
				<ExpensesHistoryDialog history={expenseHistory}/>
				</CardTitle>
				<CardDescription>Shows recent(10) expenses history</CardDescription>
				<CardAction>
					<QuickAddExpenseDialog>
						<Button
						>
							Add Expenses
						</Button>
					</QuickAddExpenseDialog>
				</CardAction>
			</CardHeader>
			<CardContent>
				{[...expenseHistory].splice(0, 10).map(
					item => 
				<CollapsibleItem 
				key={item.id}
				trigger={new Date(item.date).toDateString()}
				onRestore={() => removeExpenseHistory(item.id)}
				>
					<p className="lg font-semibold">Total: {item.amount}</p>
					{
						item.expenses.map((expense, index) => {
							return (
								<p key={index}>{expense.category}: {expense.value}</p>
							);
						})
					}
				</CollapsibleItem>
				)}
			</CardContent>
		</Card>
	);
} 
