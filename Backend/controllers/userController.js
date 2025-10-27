import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js';
import generateToken from '../utils/generateToken.js';

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !email || !password) {
    res.status(400);
    throw new Error('Please fill all required fields.');
  }

  let user = await User.findOne({ email });
  if (user && user.isVerified) {
    res.status(400);
    throw new Error('User with this email already exists.');
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  if (user) {
    user.firstName = firstName;
    user.lastName = lastName || user.lastName;
    user.password = password;
    user.otp = otp;
    user.otpExpires = otpExpires;
    user.isVerified = false;
    await user.save();
  } else {
    user = await User.create({
      firstName,
      lastName,
      email,
      password,
      otp,
      otpExpires,
    });
  }

  try {
    const emailSubject = 'Verify Your Email Address';
    const emailText = `Your OTP is: ${otp}\n\nIt will expire in 10 minutes.`;
    const emailHtml = `<p>Your OTP is: <strong>${otp}</strong></p><p>It will expire in 10 minutes.</p>`;

    await sendEmail({
      to: user.email,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });

    res.status(201).json({
      message: 'OTP sent to your email. Please verify your account.',
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error(
      'User registered, but email could not be sent. Please check your .env credentials.'
    );
  }
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400);
    throw new Error('Please provide both email and OTP.');
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User not found.');
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error('User is already verified.');
  }

  if (user.otp !== otp) {
    res.status(400);
    throw new Error('Invalid OTP.');
  }

  if (user.otpExpires < new Date()) {
    res.status(400);
    throw new Error('OTP has expired. Please register again to get a new one.');
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  const token = generateToken(user._id);

  res.status(200).json({
    message: 'User verified successfully. You are now logged in.',
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token: token,
  });
});

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
    message: 'login successfull',
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token: token,
  });
});

export { registerUser, verifyOtp, loginUser };