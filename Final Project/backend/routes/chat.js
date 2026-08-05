const express = require('express');
const router = express.Router();

// POST /api/chat - Proxy request to Gemini API
router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key is not configured on the server.' });
  }


  // Prepare contents array
  const contents = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  // Add system instruction as the first message or use system_instruction field if supported.
  // To be safe with v1beta API, we can just inject a system prompt at the very beginning of the history.
  if (contents.length > 0 && contents[0].role === 'user') {
    contents[0].parts[0].text = `You are a helpful academic and career counselor for polytechnic diploma students in Maharashtra (MSBTE). Be encouraging, clear, and concise. Answer the following question: ${contents[0].parts[0].text}`;
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: contents,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      return res.status(response.status).json({ error: 'Error communicating with AI service' });
    }

    // Extract the text response
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content.parts.length > 0) {
      const reply = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ reply });
    } else {
      return res.status(500).json({ error: 'Invalid response from AI service' });
    }
  } catch (err) {
    console.error('Error proxying chat:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
