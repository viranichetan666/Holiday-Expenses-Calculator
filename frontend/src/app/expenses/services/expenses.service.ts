import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPayoutPayload, IPayoutResponse } from '../interface/expenses.type';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  constructor(private http: HttpClient) {}

  // Get Payout Calculations
  getPayouts(expenses: IPayoutPayload): Observable<IPayoutResponse> {
    return this.http.post<IPayoutResponse>('/api/payouts', expenses);
  }
}
