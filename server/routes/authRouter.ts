// library imports
import express from "express";

// local imports
import { registerUser, loginUser } from "../controllers/authController";

// create router object
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser)

export default router;


