// routes/userRoutes.js

import express from 'express';
import {
  registerUser,
  verifyOtp,
  loginUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);

export default router;