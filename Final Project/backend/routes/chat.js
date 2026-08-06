const express = require('express');
const router = express.Router();

// POST /api/chat - Proxy request to Gemini API with math & academic fallbacks
router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const rawMsg = messages[messages.length - 1]?.content || '';
  const query = rawMsg.toLowerCase().trim();

  // Smart Academic & Math Evaluator Fallback
  const getFallback = (q, raw) => {
    // 1. Evaluate math expressions (e.g. 2+2, 10*5, 100/4, 50-20)
    const mathMatch = raw.match(/(\d+\s*[\+\-\*\/]\s*\d+)/);
    if (mathMatch) {
      try {
        const expr = mathMatch[1].replace(/\s+/g, '');
        const result = Function('"use strict";return (' + expr + ')')();
        return `The result of **${expr}** is **${result}**.`;
      } catch (e) {}
    }

    // 2. Core Programming Concepts
    if (q.includes('variable')) {
      return "In programming (C, C++, Java, JS), a **variable** is a named storage location in memory holding a value that can be modified during program execution.\n\n**Example in C:**\n```c\nint count = 5;\nchar grade = 'A';\n```";
    }
    if (q.includes('loop') || q.includes('for') || q.includes('while')) {
      return "A **loop** repeats a block of code while a specified condition is true.\n\n**Types in C/C++:**\n- `for` loop (fixed count)\n- `while` loop (entry-controlled)\n- `do-while` loop (exit-controlled)";
    }
    if (q.includes('array')) {
      return "An **array** is a collection of elements of the same data type stored in contiguous memory locations.\n\n**Example in C:**\n```c\nint numbers[5] = {10, 20, 30, 40, 50};\n```";
    }
    if (q.includes('function') || q.includes('method')) {
      return "A **function** is a reusable block of code designed to perform a specific task.\n\n**Example in C:**\n```c\nint add(int a, int b) {\n    return a + b;\n}\n```";
    }
    if (q.includes('pointer')) {
      return "A **pointer** is a variable that stores the memory address of another variable.\n\n**Example in C:**\n```c\nint val = 100;\nint *ptr = &val;\n```";
    }

    // 3. Web & Languages
    if (q.includes('html')) {
      return "**HTML (HyperText Markup Language)** is the foundational markup language used to structure content on the web.";
    }
    if (q.includes('css')) {
      return "**CSS (Cascading Style Sheets)** controls the visual layout, colors, typography, and responsiveness of web pages.";
    }
    if (q.includes('javascript') || q.includes('js')) {
      return "**JavaScript** adds dynamic interactivity, logic, API calls, and event handling to web pages.";
    }

    // 4. MSBTE & Guidance
    if (q.includes('msbte') || q.includes('curriculum') || q.includes('syllabus') || q.includes('notes') || q.includes('manual')) {
      return "College Sahayak provides complete MSBTE diploma resources including lab manuals, notes, and question papers in our **Materials Hub**!";
    }

    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return "Hello! 👋 I am College Mitra, your AI academic counselor. Ask me any question about programming, math (e.g. `2+2`), or MSBTE diploma study resources!";
    }

    return "College Mitra is here to assist with your studies! Ask me about variables, loops, math calculations (e.g. `2+2`), or explore MSBTE resources in the **Materials** section!";
  };

  if (!apiKey) {
    return res.status(200).json({ reply: getFallback(query, rawMsg) });
  }

  // Prepare contents array for Gemini API v1beta
  const contents = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  if (contents.length > 0 && contents[0].role === 'user') {
    contents[0].parts[0].text = `You are College Mitra, an encouraging AI academic counselor for polytechnic diploma students (MSBTE). Answer clearly: ${contents[0].parts[0].text}`;
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

    return res.status(200).json({ reply: getFallback(query, rawMsg) });

  } catch (err) {
    return res.status(200).json({ reply: getFallback(query, rawMsg) });
  }
});

module.exports = router;
