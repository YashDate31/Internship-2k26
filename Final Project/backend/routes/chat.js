const express = require('express');
const router = express.Router();

// Dynamic AI Knowledge & Search Engine
async function getDynamicResponse(prompt) {
  const rawMsg = (prompt || '').trim();
  const q = rawMsg.toLowerCase();

  // 1. Instant Math & Expression Evaluator (e.g. 2+2, 2*2, 100/5, 50*12)
  const mathMatch = rawMsg.match(/(\d+\s*[\+\-\*\/]\s*\d+)/);
  if (mathMatch) {
    try {
      const expr = mathMatch[1].replace(/\s+/g, '');
      const result = Function('"use strict";return (' + expr + ')')();
      return `The result of **${expr}** is **${result}**.`;
    } catch (e) {}
  }

  // 2. Dynamic Real-Time Knowledge & Entity Search Engine (Wikipedia API)
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(rawMsg)}&format=json&origin=*`;
    const sRes = await fetch(searchUrl);
    if (sRes.ok) {
      const sData = await sRes.json();
      if (sData.query && sData.query.search && sData.query.search.length > 0) {
        let bestItem = sData.query.search[0];
        
        // Smart entity filtering for person/creator/founder queries
        if (q.includes('founder') || q.includes('who is') || q.includes('creator') || q.includes('inventor')) {
          for (const item of sData.query.search.slice(0, 5)) {
            const t = item.title.toLowerCase();
            if (!t.includes('office') && !t.includes('software') && !t.includes('list of') && !t.includes('history of')) {
              bestItem = item;
              break;
            }
          }
        }

        const sumUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(bestItem.title)}`;
        const sumRes = await fetch(sumUrl);
        if (sumRes.ok) {
          const sumData = await sumRes.json();
          if (sumData.extract && sumData.extract.length > 20) {
            return `### **${sumData.title}**\n\n${sumData.extract}`;
          }
        }
      }
    }
  } catch (e) {}

  // 3. Conversational greeting check
  if (q === 'hi' || q === 'hello' || q === 'hey' || q === 'namaste') {
    return "Hello! 👋 I am **College Mitra**, your AI academic counselor. Ask me any question about programming, computer science, general knowledge, or MSBTE diploma courses!";
  }

  return `I am **College Mitra**, your AI academic counselor! Please feel free to ask your question about programming, technical topics, science, or general knowledge in more detail so I can help you!`;
}

// POST /api/chat - Main AI Chat Route
router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const rawMsg = messages[messages.length - 1]?.content || '';
  const apiKey = process.env.GEMINI_API_KEY;

  // 1. Try Google Gemini 2.0 Flash API if configured
  if (apiKey && apiKey.length > 10 && !apiKey.startsWith('AQ.')) {
    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    if (contents.length > 0 && contents[0].role === 'user') {
      contents[0].parts[0].text = `You are College Mitra, an encouraging, highly intelligent AI academic counselor for polytechnic diploma students (MSBTE curriculum). Answer clearly, accurately, and dynamically: ${contents[0].parts[0].text}`;
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
    } catch (err) {
      console.error('Gemini API call error, falling back to dynamic search engine:', err.message);
    }
  }

  // 2. Dynamic Real-Time Knowledge & AI Engine Fallback
  const dynamicReply = await getDynamicResponse(rawMsg);
  return res.status(200).json({ reply: dynamicReply });
});

module.exports = router;
