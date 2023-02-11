// library imports
import express from "express";

// local imports
import { registerUser, loginUser, getUser } from "../controllers/authController";

// create router object
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/user', getUser)

export default router;


