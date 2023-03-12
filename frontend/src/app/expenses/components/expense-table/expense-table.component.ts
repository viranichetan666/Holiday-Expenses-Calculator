import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IExpense, IPayout } from '../../interface/expenses.type';

@Component({
  selector: 'bunk-app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.scss'],
})
export class ExpenseTableComponent {
  @Input() expenses: IExpense[] = []
  @Input() payouts: IPayout[] = []
  @Input() variants: 'expense' | 'payout' = 'expense'
  @Output() deleteExpenseHandler = new EventEmitter<IExpense>();

  get isExpense() {
    return this.variants === "expense"
  }

  get isPayout() {
    return this.variants === "payout"
  }

  deleteExpense(expense: IExpense) {
    this.deleteExpenseHandler.emit(expense);
  }
}
