export interface IExpense {
  id?: string,
  name: string;
  amount: number;
}

export interface IPayout {
  owes: string;
  owed: string;
  amount: number;
}

export interface IPayoutPayload {
  expenses: IExpense[]
}

export interface IPayoutResponse {
  data: {
    total: number,
    equalShare: number,
    payouts: IPayout[]
  },
  message: string
}
