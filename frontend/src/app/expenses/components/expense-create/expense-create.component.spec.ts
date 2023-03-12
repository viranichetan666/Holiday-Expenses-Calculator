import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCreateComponent } from './expense-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ExpenseCreateComponent', () => {
  let component: ExpenseCreateComponent;
  let fixture: ComponentFixture<ExpenseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseCreateComponent],
      imports: [FormsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onCreateExpense', () => {
    component.expenseForm.setValue({
      name: 'Test',
      amount: 100
    })
    component.onCreateExpense()
  });
});
