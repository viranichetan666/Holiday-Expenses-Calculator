import express from 'express';
import calculatorRoute from './calculator/calculator.routes'

const router = express.Router()

router.use('/calculator', calculatorRoute)

export default router 