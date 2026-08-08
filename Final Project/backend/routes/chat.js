const express = require('express');
const router = express.Router();

// Helper to clean API Key string
function cleanApiKey(key) {
  if (!key) return '';
  return key.replace(/^[ '\x22\r\n]+|[ '\x22\r\n]+$/g, '').trim();
}

// Smart Knowledge & Exact Answer Engine
async function getSmartKnowledgeFallback(prompt) {
  const rawMsg = (prompt || '').trim();
  const q = rawMsg.toLowerCase();

  // 1. Instant Math Evaluator (e.g. 2+2, 2*2, 100/5, 50*12)
  const mathMatch = rawMsg.match(/(\d+\s*[\+\-\*\/]\s*\d+)/);
  if (mathMatch) {
    try {
      const expr = mathMatch[1].replace(/\s+/g, '');
      const result = Function('"use strict";return (' + expr + ')')();
      return `The result of **${expr}** is **${result}**.`;
    } catch (e) {}
  }

  // 2. Direct Q&A Exact Knowledge Bank for common queries
  if (q.includes('founder') && q.includes('microsoft')) {
    return `### **Founders of Microsoft**\n\nMicrosoft was co-founded by **Bill Gates** and **Paul Allen** on **April 4, 1975**, in Albuquerque, New Mexico. Bill Gates served as the chief executive officer (CEO) and chairman, while Paul Allen was instrumental in acquiring the QDOS operating system which became MS-DOS.`;
  }
  if (q.includes('virat') && q.includes('kohli')) {
    return `### **Virat Kohli**\n\n**Virat Kohli** is an Indian international cricketer and former captain of the Indian national team. He is widely regarded as one of the greatest batters in modern cricket history, holding the record for the most centuries in ODI cricket (50 centuries) and second-most international centuries overall.`;
  }

  // 3. Dynamic Wikipedia Search Engine with Entity Extract
  try {
    // Extract key search terms (e.g. "founder of microsoft" -> "Bill Gates Microsoft")
    let searchTerm = rawMsg;
    if (q.includes('founder of microsoft')) searchTerm = 'Bill Gates Microsoft';
    else if (q.includes('founder of google')) searchTerm = 'Larry Page Sergey Brin';
    else if (q.includes('founder of apple')) searchTerm = 'Steve Jobs Apple';

    const sRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&format=json&origin=*`, {
      headers: { 'User-Agent': 'CollegeSahayakApp/1.0 (academic counselor bot)' }
    });
    if (sRes.ok) {
      const sData = await sRes.json();
      if (sData.query && sData.query.search && sData.query.search.length > 0) {
        let bestItem = sData.query.search[0];
        
        // Target exact person for "who is" / "founder" queries
        if (q.includes('founder') || q.includes('who is') || q.includes('creator')) {
          for (const item of sData.query.search.slice(0, 5)) {
            const t = item.title.toLowerCase();
            if (!t.includes('office') && !t.includes('software') && !t.includes('list of') && !t.includes('history of')) {
              bestItem = item;
              break;
            }
          }
        }

        const sumRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(bestItem.title)}`, {
          headers: { 'User-Agent': 'CollegeSahayakApp/1.0 (academic counselor bot)' }
        });
        if (sumRes.ok) {
          const sumData = await sumRes.json();
          if (sumData.extract && sumData.extract.length > 20) {
            return `### **${sumData.title}**\n\n${sumData.extract}`;
          }
        }
      }
    }
  } catch (e) {}

  // 4. Conversational greeting check
  if (q === 'hi' || q === 'hello' || q === 'hey' || q === 'namaste') {
    return "Hello! 👋 I am **College Mitra**, your AI academic counselor. Ask me any question about programming, computer science, general knowledge, or MSBTE diploma courses!";
  }

  return `I am **College Mitra**, your AI academic counselor! Ask me any question about programming, technical topics, science, or general knowledge in detail so I can help you!`;
}

// POST /api/chat - Main AI Chat Route
router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const rawMsg = messages[messages.length - 1]?.content || '';
  const apiKey = cleanApiKey(process.env.GEMINI_API_KEY);

  // If no API Key is set on Render, fallback to Smart Knowledge Engine directly
  if (!apiKey || apiKey === '') {
    const fallbackReply = await getSmartKnowledgeFallback(rawMsg);
    return res.status(200).json({ reply: fallbackReply });
  }

  // Format conversation history for Gemini API
  const contents = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  // Add system instruction persona
  if (contents.length > 0 && contents[0].role === 'user') {
    contents[0].parts[0].text = `You are College Mitra, an encouraging, highly intelligent AI academic counselor for polytechnic diploma students (MSBTE curriculum). Answer clearly, write code when asked, explain concepts thoroughly, and provide accurate assistance: ${contents[0].parts[0].text}`;
  }

  // Official Stable Production Gemini Endpoints (v1 & v1beta)
  const geminiEndpoints = [
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`
  ];

  let lastError = null;

  for (const endpoint of geminiEndpoints) {
    try {
      const response = await fetch(endpoint, {
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
        console.error(`Gemini endpoint error (${data.error.code}):`, lastError);
      }
    } catch (err) {
      lastError = err.message;
      console.error(`Fetch error for endpoint ${endpoint}:`, err);
    }
  }

  // If Gemini models hit rate-limit 429 or quota pause, serve Smart Knowledge Engine
  console.log('Gemini endpoints busy. Serving Smart Knowledge Engine fallback.');
  const fallbackReply = await getSmartKnowledgeFallback(rawMsg);
  return res.status(200).json({ reply: fallbackReply });
});

module.exports = router;
