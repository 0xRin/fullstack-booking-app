import express from 'express';
import { createPlace, getSinglePlace, getUserPlaces, editPlace } from '../controllers/placeController';
import { AuthRequest, authenticateUserMiddleware } from '../middleware/authenticateUserMiddleware';

const router = express.Router();

router.route('/').post(authenticateUserMiddleware, createPlace).get(authenticateUserMiddleware, getUserPlaces).put(editPlace)

router.get('/:id', getSinglePlace)


export default router;