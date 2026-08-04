const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTP = async (to, otp) => {
  // Always log OTP for convenience
  console.log('==================================================');
  console.log(`🔑 OTP for ${to}: ${otp}`);
  console.log('==================================================');

  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️  RESEND_API_KEY not set. Email not sent.');
    return false;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'College Sahayak <onboarding@resend.dev>',
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
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999; text-align: center;">College Sahayak — Your Campus, Simplified.</p>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return false;
    }

    console.log(`✉️  OTP email sent successfully to ${to} (id: ${data?.id})`);
    return true;
  } catch (err) {
    console.error('❌ Exception sending OTP email:', err);
    return false;
  }
};

const sendFeedbackEmail = async (feedbackType, message, userEmail) => {
  if (!process.env.RESEND_API_KEY) {
    console.log('⚠️ RESEND_API_KEY missing. Logging feedback instead:');
    console.log(`Type: ${feedbackType}\nUser: ${userEmail}\nMessage: ${message}`);
    return true;
  }

  try {
    const { error } = await resend.emails.send({
      from: 'College Sahayak <onboarding@resend.dev>',
      to: 'yashdate31@gmail.com',
      replyTo: userEmail,
      subject: `New Feedback: ${feedbackType}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h3>New Feedback Received</h3>
          <p><strong>Type:</strong> ${feedbackType}</p>
          <p><strong>From:</strong> ${userEmail}</p>
          <hr />
          <p>${message}</p>
        </div>
      `
    });

    if (error) {
      console.error('❌ Resend feedback error:', error);
      return false;
    }

    console.log('✉️ Feedback email sent successfully.');
    return true;
  } catch (err) {
    console.error('❌ Exception sending feedback email:', err);
    return false;
  }
};

module.exports = { sendOTP, sendFeedbackEmail };
