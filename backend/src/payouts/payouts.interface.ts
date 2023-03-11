export interface UserExpense {
  amount: number;
  name: string;
}

export interface PayoutsResponse {
  owed: string;
  owns: string;
  amount: number;
}

export interface PayoutsResponseType<T> {
  data: T;
  message: string
}

export interface PayoutsBodyType {
  expenses: UserExpense[]
}