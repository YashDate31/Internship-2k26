const express = require('express');
const router = express.Router();
const { sendFeedbackEmail } = require('../utils/sendEmail');

// POST /api/feedback
router.post('/', async (req, res) => {
  const { type, message, email } = req.body;

  if (!type || !message || !email) {
    return res.status(400).json({ error: 'Type, message, and email are required' });
  }

  try {
    const success = await sendFeedbackEmail(type, message, email);
    
    if (success) {
      res.status(200).json({ message: 'Feedback sent successfully' });
    } else {
      res.status(500).json({ error: 'Failed to send feedback email' });
    }
  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
