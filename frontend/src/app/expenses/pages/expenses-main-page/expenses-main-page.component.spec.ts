import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesMainPageComponent } from './expenses-main-page.component';
import { ExpenseCreateComponent } from './../../components/expense-create/expense-create.component';
import { ExpenseTableComponent } from './../../components/expense-table/expense-table.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ExpensesService } from '../../services/expenses.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { generateUUID } from '../../helpers/expenses';
import { mock, MockProxy } from 'jest-mock-extended';
import { of } from 'rxjs';

const expense = {
  id: generateUUID(),
  name: 'Test',
  amount: 100
}

const payoutResponse = {
  "data": {
      "total": 23.5,
      "equalShare": 11.75,
      "payouts": [
          {
              "owes": "Adriana",
              "owed": "Bao",
              "amount": 0.25
          }
      ]
  },
  "message": "success"
}

const mockExpenseService = {
  getPayouts: jest
    .fn()
    .mockReturnValue(
      Promise.resolve(payoutResponse)
    )
};

describe('ExpensesMainPageComponent', () => {
  let component: ExpensesMainPageComponent;
  let fixture: ComponentFixture<ExpensesMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpensesMainPageComponent, ExpenseCreateComponent, ExpenseTableComponent],
      imports: [RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: ExpensesService, useValue: mockExpenseService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it.only('should create', () => {
    expect(component).toBeTruthy();
  });

  it.only('should call deleteExpenseHandler', () => {
    component.expenses = [expense]
    component.deleteExpenseHandler(expense)
  });

  it.only('should call createExpenseHandler', () => {
    jest
    .spyOn(mockExpenseService, 'getPayouts')
    .mockReturnValue(of(payoutResponse))
    component.createExpenseHandler(expense)
  })
});
