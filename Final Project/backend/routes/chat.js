const express = require('express');
const router = express.Router();

// POST /api/chat - Dynamic AI Chatbot powered by Google Gemini API
router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const rawMsg = messages[messages.length - 1]?.content || '';
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ 
      reply: "AI Chatbot key is not configured. Please set the GEMINI_API_KEY environment variable in Render backend settings." 
    });
  }

  // Format conversation history for Gemini API
  const contents = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  // Add system instruction persona to the prompt
  if (contents.length > 0 && contents[0].role === 'user') {
    contents[0].parts[0].text = `You are College Mitra, a helpful, friendly, and highly intelligent AI academic counselor for polytechnic diploma students (MSBTE curriculum). Answer clearly, write code when asked, explain concepts thoroughly, and provide accurate assistance: ${contents[0].parts[0].text}`;
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    });

    const data = await response.json();

    if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
      const reply = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ reply });
    }

    if (data.error) {
      console.error('Gemini API Error:', data.error);
      return res.status(500).json({ 
        reply: `AI API Error: ${data.error.message || 'Failed to fetch response from Gemini API.'}` 
      });
    }

    return res.status(500).json({ reply: "Sorry, I couldn't process your request right now." });

  } catch (err) {
    console.error('Chat endpoint error:', err);
    return res.status(500).json({ reply: "Network error connecting to AI server. Please try again." });
  }
});

module.exports = router;
