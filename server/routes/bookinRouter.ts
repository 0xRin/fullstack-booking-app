import express from 'express'
import { createBooking, getBookings } from '../controllers/bookinController';
import { authenticateUserMiddleware } from '../middleware/authenticateUserMiddleware';

const router = express.Router();

router.route('/').get(authenticateUserMiddleware, getBookings).post(authenticateUserMiddleware, createBooking)


export default router;