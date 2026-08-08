const express = require('express');
const router = express.Router();

// POST /api/chat — Powered entirely by Google Gemini AI
router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const apiKey = (process.env.GEMINI_API_KEY || '').replace(/^[ '"\r\n]+|[ '"\r\n]+$/g, '').trim();

  // Format conversation history for Gemini
  const contents = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  // System instruction — College Mitra persona
  if (contents.length > 0 && contents[0].role === 'user') {
    contents[0].parts[0].text =
      'You are College Mitra, a helpful and intelligent AI academic counselor for polytechnic diploma students (MSBTE curriculum). Answer clearly and accurately. Write code when asked. Explain concepts with examples:\n\n' +
      contents[0].parts[0].text;
  }

  // Try stable production endpoints in order
  const endpoints = [
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
  ];

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      });
      const data = await response.json();

      if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return res.status(200).json({ reply: data.candidates[0].content.parts[0].text });
      }

      console.error('Gemini error:', data.error?.code, data.error?.message);
    } catch (err) {
      console.error('Fetch error:', err.message);
    }
  }

  return res.status(200).json({ reply: 'AI is temporarily busy. Please try again in a moment.' });
});

module.exports = router;
