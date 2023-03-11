import { calculatorService } from './calculator.service';
import { Request, Response, NextFunction } from 'express';
import { CalculatorResponse, ResponseType, UserExpense } from './calculator.interface';

const expenseCalculator = (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: UserExpense[] = req.body;
    const result: ResponseType<CalculatorResponse[]> = calculatorService.expenseCalculator(body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const calculatorController = {
  expenseCalculator,
};
  