import express from 'express';
import { createPlace, getSinglePlace, getUserPlaces, editPlace, getAllPlaces } from '../controllers/placeController';
import { authenticateUserMiddleware } from '../middleware/authenticateUserMiddleware';

const router = express.Router();

router.route('/').post(authenticateUserMiddleware, createPlace).put(editPlace).get(getAllPlaces)

router.route('/user-places').get(authenticateUserMiddleware, getUserPlaces)

router.get('/:id', getSinglePlace)


export default router;