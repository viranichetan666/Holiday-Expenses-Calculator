import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ExpensesService } from './expenses.service';

const payload = {
	"expenses": [
		{ "name": "Adriana", "amount": 5.75 },
		{ "name": "Adriana", "amount": 5.75 },
		{ "name": "Bao", "amount": 12 }
	]
}

describe('ExpensesService', () => {
  let service: ExpensesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ExpensesService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should have called api for getPayouts', () => {
    service
      .getPayouts(payload)
      .subscribe();
    const req = httpMock.expectOne(`/api/payouts`);
    expect(req.request.method).toBe('POST');
    req.flush([]);
  });

});
