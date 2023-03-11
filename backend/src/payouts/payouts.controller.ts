import { payoutsService } from './payouts.service';
import { Request, Response, NextFunction } from 'express';
import { PayoutsResponse, PayoutsBodyType, PayoutsResponseType } from './payouts.interface';

const expenseCalculator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: PayoutsBodyType = req.body;
    const result: PayoutsResponseType<PayoutsResponse[]> = payoutsService.expenseCalculator(body.expenses);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const payoutsController = {
  expenseCalculator,
};
  