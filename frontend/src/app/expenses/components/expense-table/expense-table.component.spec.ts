import { ComponentFixture, TestBed } from '@angular/core/testing';
import { generateUUID } from '../../helpers/expenses';
import { ExpenseTableComponent } from './expense-table.component';

describe('ExpenseTableComponent', () => {
  let component: ExpenseTableComponent;
  let fixture: ComponentFixture<ExpenseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteExpense', () => {
    component.deleteExpense({
      id: generateUUID(),
      name: 'Test',
      amount: 1000
    })
  });
});
