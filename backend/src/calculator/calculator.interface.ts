export interface UserExpense {
  amount: number;
  name: string;
}

export interface CalculatorResponse {
  owed: string;
  owns: string;
  amount: number;
}

export interface ResponseType<T> {
  data: T;
  message: string
}
