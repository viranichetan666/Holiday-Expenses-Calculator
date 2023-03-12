import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface IExpenseForm {
  name: FormControl<string>;
  amount: FormControl<number | undefined>;
}

@Component({
  selector: 'bunk-app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrls: ['./expense-create.component.scss'],
})

export class ExpenseCreateComponent {
  @Output() createExpenseHandler = new EventEmitter();

  expenseForm = new FormGroup<IExpenseForm>({
    name: new FormControl<string>('', {nonNullable: true, validators: Validators.required}),
    amount: new FormControl(undefined, {nonNullable: true, validators: Validators.required}),
  });

  onCreateExpense() {
    this.createExpenseHandler.emit(this.expenseForm.value);
    this.expenseForm.reset();
  }
}
