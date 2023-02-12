import express from 'express';
import { createPlace, getUserPlaces } from '../controllers/placeController';
import { AuthRequest, authenticateUserMiddleware } from '../middleware/authenticateUserMiddleware';

const router = express.Router();

router.route('/').post(authenticateUserMiddleware, createPlace).get(authenticateUserMiddleware, getUserPlaces)



export default router;