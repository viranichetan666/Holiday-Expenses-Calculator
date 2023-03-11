import express from 'express';
import payoutsRoute from './payouts/payouts.routes'

const router = express.Router()

router.use('/payouts', payoutsRoute)

export default router 