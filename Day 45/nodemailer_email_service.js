// Day 45: NodeMailer SMTP Email Service
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER || 'demo@example.com',
        pass: process.env.EMAIL_PASS || 'secret'
    }
});

async function sendWelcomeEmail(recipientEmail, userName) {
    const mailOptions = {
        from: '"College Sahayak" <no-reply@collegesahayak.com>',
        to: recipientEmail,
        subject: 'Welcome to College Sahayak Portal!',
        html: `<h2>Welcome, ${userName}!</h2><p>Thank you for registering on College Sahayak. You can now access syllabus, lab manuals, and notes.</p>`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = { sendWelcomeEmail };
