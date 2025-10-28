import nodemailer from 'nodemailer';
import 'dotenv/config';

// Try using Port 587 with TLS
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Gmail's SMTP server
  port: 587, // Port for TLS
  secure: false, // false for TLS
  auth: {
    user: process.env.EMAIL_USER, // Your email from .env
    pass: process.env.EMAIL_PASS, // Your app password from .env
  },
  tls: {
    // Do not fail on invalid certs (less secure, but sometimes needed on cloud platforms)
    // Consider removing this if it connects without it
     rejectUnauthorized: false 
  }
});

/**
 * Sends an email.
 * @param {string} to - Recipient's email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text body
 * @param {string} [html] - Optional HTML body
 */
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"AI Quiz App" <${process.env.EMAIL_USER}>`, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: html, // html body
    });

    console.log(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    // Log the detailed error on the server
    console.error('Error sending email:', error); 
    // Throw a generic error to the client/caller
    throw new Error('Email could not be sent.'); 
  }
};

export default sendEmail;