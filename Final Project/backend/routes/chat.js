const express = require('express');
const router = express.Router();

// Helper to clean API Key string
function cleanKey(key) {
  return (key || '').replace(/^[ '"\r\n]+|[ '"\r\n]+$/g, '').trim();
}

// POST /api/chat — Powered by Groq AI (LLaMA 3) with Gemini fallback
router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const groqKey = cleanKey(process.env.GROQ_API_KEY);
  const geminiKey = cleanKey(process.env.GEMINI_API_KEY);

  // System persona for College Mitra
  const systemPrompt = 'You are College Mitra, a helpful and intelligent AI academic counselor for polytechnic diploma students (MSBTE curriculum). Answer clearly and accurately. Write code with examples when asked. Explain concepts in simple terms.';

  // ── 1. Try Groq AI (LLaMA 3, Free, No Quota Issues) ──────────────────────
  if (groqKey) {
    try {
      const groqMessages = [
        { role: 'system', content: systemPrompt },
        ...messages
      ];

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: groqMessages,
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });

      const data = await response.json();

      if (response.ok && data.choices?.[0]?.message?.content) {
        return res.status(200).json({ reply: data.choices[0].message.content });
      }

      console.error('Groq error:', data.error?.message);
    } catch (err) {
      console.error('Groq fetch error:', err.message);
    }
  }

  // ── 2. Try Google Gemini AI ───────────────────────────────────────────────
  if (geminiKey) {
    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    if (contents.length > 0 && contents[0].role === 'user') {
      contents[0].parts[0].text = systemPrompt + '\n\n' + contents[0].parts[0].text;
    }

    const geminiUrls = [
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
    ];

    for (const url of geminiUrls) {
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
        console.error('Gemini error:', data.error?.code, data.error?.message?.substring(0, 100));
      } catch (err) {
        console.error('Gemini fetch error:', err.message);
      }
    }
  }

  return res.status(200).json({ reply: 'AI is temporarily busy. Please try again in a moment.' });
});

module.exports = router;
