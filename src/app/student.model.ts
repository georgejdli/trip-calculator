import { Expense } from './expense.model';
export class Student {
    public name: string;
    public id: number;
    public expenses: Expense[] = [];
    public totalExpense: number = 0.00;
    public amountsOwed = [];

    constructor() {
    }

    addExpense(expense: Expense) {
        this.expenses.push(expense);
        this.totalExpense += expense.amount;
    }
}
