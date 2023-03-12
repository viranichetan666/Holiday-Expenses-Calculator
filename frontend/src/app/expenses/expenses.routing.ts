import { RouterModule, Routes } from '@angular/router';
import { ExpensesMainPageComponent } from './pages/expenses-main-page/expenses-main-page.component';

const expensesRoutes: Routes = [
  { path: '', component: ExpensesMainPageComponent },
];

export const expensesRouting = RouterModule.forChild(expensesRoutes);
