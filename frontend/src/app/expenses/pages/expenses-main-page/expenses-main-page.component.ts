import { Component } from '@angular/core';
import { generateUUID } from '../../helpers/expenses';
import { IExpense, IPayout } from '../../interface/expenses.type';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'bunk-app-expenses-main-page',
  templateUrl: './expenses-main-page.component.html',
  styleUrls: ['./expenses-main-page.component.scss'],
})
export class ExpensesMainPageComponent {
  constructor(
    private readonly expenseService: ExpensesService,
  ) {}

  expenses:IExpense[] = [];
  payouts:IPayout[] = [];
  total: number = 0;
  equalShare: number = 0;
  isSettleUp: boolean = false;

  deleteExpenseHandler(expense: IExpense){
    this.expenses = this.expenses.filter(existExpense => existExpense.id !== expense.id)
    this.getPayoutsHandler()
  }

  createExpenseHandler(expense: IExpense) {
    const newId = generateUUID()
    const newExpence = {
      ...expense,
      id: newId
    }
    this.expenses.push(newExpence)
  }

  getPayoutsHandler(){
    if(this.expenses.length) {
      this.expenseService.getPayouts({
        "expenses": this.expenses
      }).subscribe((res) => {
        this.payouts = res.data.payouts
        this.total = res.data.total
        this.equalShare = res.data.equalShare
      })
    } else {
      this.payouts = [];
      this.total = 0;
      this.equalShare = 0;
    }
  }

  settleUpHandler() {
    this.isSettleUp = true;
    this.getPayoutsHandler()
  }
}
