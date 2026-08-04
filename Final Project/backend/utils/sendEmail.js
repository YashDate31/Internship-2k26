const https = require('https');

// Send email via Brevo (formerly Sendinblue) REST API
// Works on Render free tier (HTTP-based, not SMTP)
const sendViaBrevo = (to, subject, htmlContent) => {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      reject(new Error('BREVO_API_KEY not set'));
      return;
    }

    const body = JSON.stringify({
      sender: { name: 'College Sahayak', email: 'yashdate31@gmail.com' },
      to: [{ email: to }],
      subject,
      htmlContent
    });

    const options = {
      hostname: 'api.brevo.com',
      path: '/v3/smtp/email',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(true);
        } else {
          console.error('❌ Brevo error response:', data);
          reject(new Error(`Brevo API error: ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
};

const sendOTP = async (to, otp) => {
  // Always log OTP for development convenience
  console.log('==================================================');
  console.log(`🔑 OTP for ${to}: ${otp}`);
  console.log('==================================================');

  if (!process.env.BREVO_API_KEY) {
    console.warn('⚠️  BREVO_API_KEY not set. Email not sent.');
    return false;
  }

  try {
    await sendViaBrevo(
      to,
      'Verify your College Sahayak account',
      `
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
      `
    );
    console.log(`✉️  OTP email sent successfully to ${to}`);
    return true;
  } catch (err) {
    console.error('❌ Error sending OTP email:', err.message);
    return false;
  }
};

const sendFeedbackEmail = async (feedbackType, message, userEmail) => {
  if (!process.env.BREVO_API_KEY) {
    console.log('⚠️ BREVO_API_KEY missing. Logging feedback instead:');
    console.log(`Type: ${feedbackType}\nUser: ${userEmail}\nMessage: ${message}`);
    return true;
  }

  try {
    await sendViaBrevo(
      'yashdate31@gmail.com',
      `New Feedback: ${feedbackType}`,
      `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h3>New Feedback Received</h3>
          <p><strong>Type:</strong> ${feedbackType}</p>
          <p><strong>From:</strong> ${userEmail}</p>
          <hr />
          <p>${message}</p>
        </div>
      `
    );
    console.log('✉️ Feedback email sent successfully.');
    return true;
  } catch (err) {
    console.error('❌ Error sending feedback email:', err.message);
    return false;
  }
};

module.exports = { sendOTP, sendFeedbackEmail };
