export interface UserExpenseType {
  amount: number;
  name: string;
}

export interface SettleUpType {
  owed: string;
  owes: string;
  amount: number;
}

export interface PayoutsResponseDataType {
  total: number;
  equalShare: number;
  payouts: SettleUpType[];
}
export interface PayoutsResponseType {
  data: PayoutsResponseDataType;
  message: string;
}

export interface PayoutsBodyType {
  expenses: UserExpenseType[];
}
