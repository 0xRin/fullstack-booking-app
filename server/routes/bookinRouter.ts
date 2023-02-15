import express from 'express'
import { createBooking } from '../controllers/bookinController';
import { authenticateUserMiddleware } from '../middleware/authenticateUserMiddleware';

const router = express.Router();

router.route('/').post(authenticateUserMiddleware, createBooking);


export default router;