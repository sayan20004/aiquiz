import nodemailer from 'nodemailer';
import 'dotenv/config';

// Configure Nodemailer for SendGrid SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',        // SendGrid SMTP host
  port: 587,                       // Standard port for TLS
  secure: false,                   // false for TLS on port 587
  auth: {
    user: 'apikey',                // SendGrid requires the literal string 'apikey' as the user
    pass: process.env.SENDGRID_API_KEY, // Your SendGrid API Key from .env
  },
});

/**
 * Sends an email using SendGrid via Nodemailer.
 * @param {string} to - Recipient's email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text body
 * @param {string} [html] - Optional HTML body
 */
const sendEmail = async ({ to, subject, text, html }) => {
  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_VERIFIED_SENDER) {
    console.error('SendGrid API Key or Verified Sender not configured in environment variables.');
    throw new Error('Email service not configured.');
  }

  try {
    const info = await transporter.sendMail({
      // IMPORTANT: Use the email address you verified in SendGrid
      from: `"AI Quiz App" <${process.env.SENDGRID_VERIFIED_SENDER}>`,
      to: to,
      subject: subject,
      text: text,
      html: html,
    });

    console.log(`Email sent via SendGrid: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('Error sending email via SendGrid:', error);
    // Log specific details from SendGrid if available
    if (error.responseCode && error.response) {
       console.error(`SendGrid Error Code: ${error.responseCode}`);
       console.error(`SendGrid Response: ${error.response}`);
    }
    throw new Error('Email could not be sent.');
  }
};

export default sendEmail;