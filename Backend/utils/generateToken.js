// utils/generateToken.js
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// We just return the token, which is easier for Postman.
// The client will store it (e.g., in localStorage).
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  return token;
};

export default generateToken;