// Day 61: 2-Step Authentication with OTP using Brevo API (3 Aug 2026)
const axios = require('axios');

async function sendBrevoOTP(userEmail, otpCode) {
    const apiKey = process.env.BREVO_API_KEY || 'xkeysib-demo-key';
    const endpoint = 'https://api.brevo.com/v3/smtp/email';

    const payload = {
        sender: { name: 'College Sahayak', email: 'no-reply@collegesahayak.com' },
        to: [{ email: userEmail }],
        subject: 'College Sahayak - 2-Step Verification OTP',
        htmlContent: `<div style="font-family:Arial,sans-serif;padding:20px;border:1px solid #3498db;border-radius:8px;">
            <h2>College Sahayak Security OTP</h2>
            <p>Your 2-Step Authentication OTP is: <strong style="font-size:24px;color:#2c3e50;">${otpCode}</strong></p>
            <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
        </div>`
    };

    try {
        const response = await axios.post(endpoint, payload, {
            headers: { 'api-key': apiKey, 'Content-Type': 'application/json' }
        });
        console.log('OTP sent via Brevo API:', response.data.messageId);
        return { success: true, messageId: response.data.messageId };
    } catch (error) {
        console.error('Brevo API Error:', error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = { sendBrevoOTP };
