// controllers/userController.js

import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js';
import generateToken from '../utils/generateToken.js';

// ... (keep your existing registerUser and verifyOtp functions) ...

const registerUser = asyncHandler(async (req, res) => {
  // ... (existing code)
});

const verifyOtp = asyncHandler(async (req, res) => {
  // ... (existing code)
});

// --- ADD THIS NEW FUNCTION ---
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide both email and password.');
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password.');
  }

  if (!user.isVerified) {
    res.status(401);
    throw new Error('Please verify your email before logging in.');
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid email or password.');
  }

  const token = generateToken(user._id);

  res.status(200).json({
    message:"login successfull",
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token: token,
  });
});

export { registerUser, verifyOtp, loginUser };