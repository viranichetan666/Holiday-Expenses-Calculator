import express from 'express';
import { payoutsController } from './payouts.controller';

const router = express.Router()

router.route('/').post(payoutsController.expenseCalculator)

export default router 