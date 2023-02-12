import express from 'express';
import { createPlace } from '../controllers/placeController';
import { AuthRequest, authenticateUserMiddleware } from '../middleware/authenticateUserMiddleware';

const router = express.Router();

router.post('/', authenticateUserMiddleware, createPlace)



export default router;