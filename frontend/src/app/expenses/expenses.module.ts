import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { expensesRouting } from './expenses.routing';
import { ExpensesMainPageComponent } from './pages/expenses-main-page/expenses-main-page.component';
import { ExpenseTableComponent } from './components/expense-table/expense-table.component';
import { ExpenseCreateComponent } from './components/expense-create/expense-create.component';

@NgModule({
  declarations: [
    ExpensesMainPageComponent,
    ExpenseTableComponent,
    ExpenseCreateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    expensesRouting,
  ],
  exports: [ExpensesMainPageComponent, ExpenseTableComponent, ExpenseCreateComponent],
})
export class ExpensesModule {}
