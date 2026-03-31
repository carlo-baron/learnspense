import { 
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ExpensesCalculator } from "../home/ExpensesCalculator";

export function QuickAddExpenseDialog(
	{children}
	:
	{children: React.ReactNode}
){
	return(
		<Dialog>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Quick Add Expenses</DialogTitle>
				</DialogHeader>
				<ExpensesCalculator />
			</DialogContent>	
		</Dialog>
	);
}
