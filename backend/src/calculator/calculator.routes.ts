import express from 'express';
import { calculatorController } from './calculator.controller';

const router = express.Router()

router.route('/expense-calculator').post(calculatorController.expenseCalculator)

export default router 