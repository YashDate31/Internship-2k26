const express = require('express');
const router = express.Router();

// Helper: Smart Knowledge Engine (DuckDuckGo + Wikipedia + Math + Academic Fallbacks)
async function getSmartReply(rawMsg) {
  const q = rawMsg.toLowerCase().trim();

  // 1. Math evaluation (e.g. 2+2, 10*5, 100/4, 50-20)
  const mathMatch = rawMsg.match(/(\d+\s*[\+\-\*\/]\s*\d+)/);
  if (mathMatch) {
    try {
      const expr = mathMatch[1].replace(/\s+/g, '');
      const result = Function('"use strict";return (' + expr + ')')();
      return `The result of **${expr}** is **${result}**.`;
    } catch (e) {}
  }

  // 2. DuckDuckGo Instant Knowledge Lookup (handles general knowledge, people like "who is virat kohli", events, terms)
  try {
    const ddgRes = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(rawMsg)}&format=json`);
    if (ddgRes.ok) {
      const ddgData = await ddgRes.json();
      if (ddgData.AbstractText && ddgData.AbstractText.length > 25) {
        return `**${ddgData.Heading || rawMsg}**\n\n${ddgData.AbstractText}`;
      }
    }
  } catch (e) {}

  // 3. Wikipedia REST API Fallback
  try {
    const searchTerm = rawMsg
      .replace(/^(who|what|where|why|how|tell me about|explain)\s+(is|are|was|were|about)?\s*/i, '')
      .trim();
    if (searchTerm.length >= 2) {
      const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`);
      if (wikiRes.ok) {
        const wikiData = await wikiRes.json();
        if (wikiData.extract && wikiData.extract.length > 30) {
          return `**${wikiData.title || searchTerm}**\n\n${wikiData.extract}`;
        }
      }
    }
  } catch (e) {}

  // 4. Core Programming & Academic Concept Bank
  if (q.includes('variable')) {
    return "In programming (C, C++, Java, JS), a **variable** is a named storage location in memory holding a value that can be modified during program execution.\n\n**Example in C:**\n```c\nint count = 5;\nchar grade = 'A';\n```";
  }
  if (q.includes('loop') || q.includes('for') || q.includes('while')) {
    return "A **loop** repeats a block of code while a specified condition is true.\n\n**Types in C/C++:**\n- `for` loop (fixed iterations)\n- `while` loop (entry-controlled)\n- `do-while` loop (exit-controlled)";
  }
  if (q.includes('array')) {
    return "An **array** is a fixed-size collection of elements of the same data type stored in contiguous memory locations.\n\n**Example in C:**\n```c\nint numbers[5] = {10, 20, 30, 40, 50};\n```";
  }
  if (q.includes('function') || q.includes('method')) {
    return "A **function** is a reusable block of code designed to perform a specific task.\n\n**Example in C:**\n```c\nint add(int a, int b) {\n    return a + b;\n}\n```";
  }
  if (q.includes('pointer')) {
    return "A **pointer** is a variable that stores the memory address of another variable.\n\n**Example in C:**\n```c\nint val = 100;\nint *ptr = &val;\n```";
  }

  // Web Development
  if (q.includes('html')) {
    return "**HTML (HyperText Markup Language)** is the standard markup language used to create and structure pages on the Web.";
  }
  if (q.includes('css')) {
    return "**CSS (Cascading Style Sheets)** describes how HTML elements are to be displayed on screen, paper, or in other media.";
  }
  if (q.includes('javascript') || q.includes('js')) {
    return "**JavaScript** is a high-level programming language that adds dynamic interactivity, logic, and API communication to web pages.";
  }
  if (q.includes('react')) {
    return "**React.js** is a popular component-based JavaScript library developed by Meta for building user interfaces.";
  }
  if (q.includes('node') || q.includes('express')) {
    return "**Node.js & Express.js** provide a lightweight JavaScript backend runtime and web application framework for building scalable REST APIs.";
  }

  // MSBTE & College Sahayak Guidance
  if (q.includes('msbte') || q.includes('curriculum') || q.includes('syllabus') || q.includes('notes') || q.includes('manual')) {
    return "College Sahayak provides complete MSBTE diploma study resources including lab manuals, notes, question papers, and assignments in our **Curriculum** and **Resources** sections!";
  }

  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return "Hello! 👋 I am College Mitra, your AI academic counselor. Ask me any question about programming, your subjects, general knowledge, or MSBTE diploma study resources!";
  }

  return `College Mitra is here to assist with your studies! Ask me about programming concepts, general knowledge, math calculations, or explore MSBTE diploma resources in the **Curriculum** section!`;
}

// POST /api/chat - Main AI Chat Route
router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const rawMsg = messages[messages.length - 1]?.content || '';
  const apiKey = process.env.GEMINI_API_KEY;

  // Try Google Gemini API if a valid key is provided
  if (apiKey && apiKey.startsWith('AIzaSy')) {
    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    if (contents.length > 0 && contents[0].role === 'user') {
      contents[0].parts[0].text = `You are College Mitra, an encouraging and knowledgeable AI academic counselor for polytechnic diploma students (MSBTE curriculum). Be helpful, friendly, and answer clearly: ${contents[0].parts[0].text}`;
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
      console.error('Gemini API call failed, switching to smart knowledge engine:', err.message);
    }
  }

  // Fallback: Smart Knowledge Engine (DuckDuckGo + Wikipedia + Math + Academic Bank)
  const smartReply = await getSmartReply(rawMsg);
  return res.status(200).json({ reply: smartReply });
});

module.exports = router;
