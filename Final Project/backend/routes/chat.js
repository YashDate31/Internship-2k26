const express = require('express');
const router = express.Router();

// Helper to clean API Key string (remove surrounding quotes, spaces, newlines)
function cleanApiKey(key) {
  if (!key) return '';
  return key.replace(/^[ '\x22\r\n]+|[ '\x22\r\n]+$/g, '').trim();
}

// POST /api/chat - Dynamic AI Chatbot powered by Google Gemini API
router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const rawMsg = messages[messages.length - 1]?.content || '';
  const apiKey = cleanApiKey(process.env.GEMINI_API_KEY);

  // Check if API Key is provided
  if (!apiKey || apiKey === '') {
    return res.status(200).json({ 
      reply: "⚠️ **AI Chatbot Key Missing**\n\nPlease ensure `GEMINI_API_KEY` is added to Render Environment Variables and click **Manual Deploy -> Deploy latest commit**." 
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

  // Model list to try sequentially
  const models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];
  let lastError = null;

  for (const model of models) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
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
        lastError = data.error.message || JSON.stringify(data.error);
        console.error(`Gemini model ${model} error:`, data.error);
      }
    } catch (err) {
      lastError = err.message;
      console.error(`Fetch error for model ${model}:`, err);
    }
  }

  // If Gemini calls failed, return clear diagnostic reply
  return res.status(200).json({ 
    reply: `⚠️ **Gemini API Error:** ${lastError || 'Failed to fetch AI response.'}\n\nPlease check your key at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).` 
  });
});

module.exports = router;
