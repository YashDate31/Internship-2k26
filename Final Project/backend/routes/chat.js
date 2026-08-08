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

  // Check if API Key is configured on Render
  if (!apiKey || apiKey.trim() === '' || apiKey.startsWith('AQ.')) {
    return res.status(200).json({ 
      reply: "⚠️ **AI Chatbot Setup Required**\n\nThe `GEMINI_API_KEY` is not configured or is invalid on Render.\n\n**Quick Fix (1 Minute):**\n1. Get a free API Key from [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)\n2. Add `GEMINI_API_KEY` to Render Dashboard -> Environment Variables.\n3. Save & Restart service!" 
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
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey.trim()}`, {
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
      return res.status(200).json({ 
        reply: `⚠️ **Gemini API Error:** ${data.error.message || 'Invalid API Key or Quota Limit Exceeded. Please check key at aistudio.google.com.'}` 
      });
    }

    return res.status(200).json({ reply: "Sorry, I couldn't process your request right now." });

  } catch (err) {
    console.error('Chat endpoint error:', err);
    return res.status(200).json({ reply: "Network error connecting to Google Gemini API. Please check internet connection." });
  }
});

module.exports = router;
