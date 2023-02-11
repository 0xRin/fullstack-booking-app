// library imports
import express from "express";

// local imports
import { registerUser, loginUser, getUser, logoutUser } from "../controllers/authController";

// create router object
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/user', getUser)
router.post('/logout', logoutUser)

export default router;


