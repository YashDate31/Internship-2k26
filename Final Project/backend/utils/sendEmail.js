const nodemailer = require('nodemailer');

const sendOTP = async (to, otp) => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  // Always log for development convenience
  console.log('==================================================');
  console.log(`ðŸ”‘ DEV OTP for ${to}: ${otp}`);
  console.log('==================================================');

  // If no credentials, we skip sending actual email (great for dev)
  if (!user || !pass) {
    console.log('âš ï¸  Email credentials not provided in .env (EMAIL_USER, EMAIL_PASS). Email not sent, using console log above.');
    return false; 
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      connectionTimeout: 5000,
      socketTimeout: 5000,
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"College Sahayak" <${user}>`,
      to,
      subject: 'Verify your College Sahayak account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1e3a8a; text-align: center;">College Sahayak</h2>
          <p style="font-size: 16px; color: #333;">Hello,</p>
          <p style="font-size: 16px; color: #333;">Thank you for registering! Please use the following One-Time Password (OTP) to verify your account.</p>
          <div style="background-color: #f8fafc; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="margin: 0; font-size: 32px; letter-spacing: 5px; color: #d97706;">${otp}</h1>
          </div>
          <p style="font-size: 14px; color: #666; text-align: center;">This code will expire in 10 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`âœ‰ï¸  OTP email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error('âŒ Error sending OTP email:', error);
    return false;
  }
};

const sendFeedbackEmail = async (feedbackType, message, userEmail) => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.log('âš ï¸ Email credentials missing. Logging feedback instead:');
    console.log(`Type: ${feedbackType}\nUser: ${userEmail}\nMessage: ${message}`);
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      connectionTimeout: 5000,
      socketTimeout: 5000,
      auth: { user, pass },
    });

    const mailOptions = {
      from: `"${userEmail} (via Feedback)" <${user}>`,
      to: 'collegesahayak@gmail.com',
      replyTo: userEmail,
      subject: `New Feedback: ${feedbackType}`,
      text: `Feedback Type: ${feedbackType}\nUser Email: ${userEmail}\n\nMessage:\n${message}`
    };

    await transporter.sendMail(mailOptions);
    console.log('âœ‰ï¸ Feedback email sent successfully.');
    return true;
  } catch (error) {
    console.error('âŒ Error sending feedback email:', error);
    return false;
  }
};

module.exports = { sendOTP, sendFeedbackEmail };

