const express = require('express');
const router = express.Router();

// POST /api/chat - Proxy request to Gemini API with robust fallbacks
router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const userMsg = (messages[messages.length - 1]?.content || '').toLowerCase();

  // Helper for smart academic fallbacks if API is keyless or quota limited
  const getFallback = (query) => {
    if (query.includes('variable')) {
      return "In programming (like C/C++/Java), a **variable** is a named storage location in memory that holds a value which can be modified during program execution.\n\n**Example in C:**\n```c\nint count = 5; // 'count' is an integer variable storing value 5\nchar grade = 'A';\n```";
    }
    if (query.includes('msbte') || query.includes('curriculum') || query.includes('syllabus')) {
      return "College Sahayak provides complete MSBTE diploma curriculum resources! You can access lab manuals, notes, question papers, and scheme details from the **Materials Hub** menu.";
    }
    if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      return "Hello! 👋 I am College Mitra, your AI academic assistant. Ask me anything about programming concepts, MSBTE subjects, or diploma study resources!";
    }
    return "College Mitra is here to help with your MSBTE studies! For full access to notes, lab manuals, and previous year question papers, check out our **Materials** page in the top menu.";
  };

  if (!apiKey) {
    return res.status(200).json({ reply: getFallback(userMsg) });
  }

  // Prepare contents array for Gemini API v1beta
  const contents = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  if (contents.length > 0 && contents[0].role === 'user') {
    contents[0].parts[0].text = `You are College Mitra, an encouraging AI academic counselor for polytechnic diploma students (MSBTE). Answer clearly and concisely: ${contents[0].parts[0].text}`;
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: contents }),
    });

    const data = await response.json();

    if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
      const reply = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ reply });
    }

    // If Gemini API returns non-ok (e.g. rate limit 429), use smart fallback
    console.warn('Gemini API Non-OK response:', data);
    return res.status(200).json({ reply: getFallback(userMsg) });

  } catch (err) {
    console.error('Error proxying chat:', err);
    return res.status(200).json({ reply: getFallback(userMsg) });
  }
});

module.exports = router;
