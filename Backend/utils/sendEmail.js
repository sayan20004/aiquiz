import sgMail from '@sendgrid/mail';
import 'dotenv/config';

// Check if API key and sender are configured
if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_VERIFIED_SENDER) {
  console.error('SendGrid API Key or Verified Sender not configured in environment variables.');
  // You might want to throw an error here or handle it appropriately
  // depending on whether email is absolutely critical for startup.
} else {
  // Set the API key for the SendGrid library
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // Uncomment the line below if you are sending mail using a regional EU subuser
  // sgMail.setDataResidency('eu');
}

/**
 * Sends an email using the @sendgrid/mail library.
 * @param {string} to - Recipient's email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text body
 * @param {string} [html] - Optional HTML body
 */
const sendEmail = async ({ to, subject, text, html }) => {
  // Ensure configuration is present before attempting to send
  if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_VERIFIED_SENDER) {
    throw new Error('Email service is not configured.');
  }

  const msg = {
    to: to,
    // IMPORTANT: Use the email address you verified in SendGrid
    from: process.env.SENDGRID_VERIFIED_SENDER,
    subject: subject,
    text: text,
    html: html || text, // Use HTML if provided, otherwise fallback to text
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent successfully via SendGrid to ${to}`);
    // SendGrid's library doesn't easily return a messageId like Nodemailer does
    // You might need to explore SendGrid's event webhooks for detailed tracking
    return { messageId: 'N/A - Sent via SendGrid API' };
  } catch (error) {
    console.error('Error sending email via SendGrid:', error);
    // Log detailed SendGrid errors if available
    if (error.response && error.response.body && error.response.body.errors) {
      console.error('SendGrid Error Details:', error.response.body.errors);
    }
    throw new Error('Email could not be sent.');
  }
};

export default sendEmail;