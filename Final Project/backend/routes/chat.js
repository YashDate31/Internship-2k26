const express = require('express');
const router = express.Router();

// Helper to clean API Key string
function cleanKey(key) {
  return (key || '').replace(/^[ '"\r\n]+|[ '"\r\n]+$/g, '').trim();
}

// System persona for College Mitra
const systemPrompt = `You are College Mitra, an expert and empathetic AI academic and career counselor designed for MSBTE polytechnic diploma students across Maharashtra. 
You provide clear, accurate, and encouraging academic guidance in clean Markdown formatting. 
When asked technical or programming questions, give concise explanations with practical code snippets. 
When asked about MSBTE curriculum, subjects, lab manuals, question papers, micro-projects, or Direct Second Year (DSE) engineering admissions, provide actionable and well-structured answers.`;

// Intelligent Built-in Academic Knowledge Engine (Zero Downtime Fallback)
function getSmartKnowledgeResponse(userMessage) {
  const q = (userMessage || '').toLowerCase().trim();

  // 1. Greetings & Introductions
  if (/^(hey|hi|hello|namaste|hola|good\s*(morning|afternoon|evening)|yo|sup)\b/i.test(q)) {
    return `### 👋 Hello! I'm **College Mitra**
I am your 24/7 AI academic counselor for **MSBTE Polytechnic Diploma** studies.

Here is what I can help you with:
- 📚 **Subject Concepts & Explanations** (OSY, ACN, DAN, CLO, SEN, and more)
- 📝 **Exam Preparation & Important Topics** (Summer / Winter Board Exams)
- 🧪 **Lab Manuals & Practical Experiments**
- 📄 **Previous Year Question Papers (PYQs)** & Model Answers
- 💡 **Micro-Project Topics & Report Writing**
- 🎓 **Direct Second Year (DSE) Degree Admissions & Career Advice**

What topic or subject would you like to explore today?`;
  }

  // 2. Who created you / College Sahayak / Founder
  if (/(who (made|created|developed|built|are)|about|founder|developer|yash).*(you|college sahayak|platform|website|yash|founder|creator)/i.test(q) || /(who created|who made|founder of|developer of|yash date)/i.test(q)) {
    return `### 🎓 About College Sahayak & College Mitra
**College Sahayak** is Maharashtra's dedicated digital platform designed to provide MSBTE diploma students with free, verified academic resources.

- 👨‍💻 **Founder & Solo Developer:** **Yash Vijay Date**
- 🎯 **Mission:** Centralize all diploma resources (Curriculum, Manuals, PYQs, Notes, and Micro-Projects) with zero clutter and lightning-fast access.
- 🤖 **College Mitra:** The built-in AI counseling assistant powered by modern language models and MSBTE curriculum data.

You can learn more on our [About Page](/about) or browse study materials in the navigation bar!`;
  }

  // 3. Operating System (OSY - 315319)
  if (/(operating system|osy|315319|process management|cpu scheduling|paging|deadlock|semaphore|thread)/i.test(q)) {
    if (/cpu scheduling|fcfs|sjf|round robin|priority/i.test(q)) {
      return `### ⚡ CPU Scheduling in Operating System (OSY - 315319)
CPU scheduling determines which process in the ready queue gets the CPU when it becomes idle.

#### 🔹 Key Scheduling Algorithms:
1. **FCFS (First-Come, First-Served):** Non-preemptive. Executes processes in order of arrival. Can cause *Convoy Effect*.
2. **SJF (Shortest Job First):** Executes the process with the shortest burst time. Gives optimal average waiting time.
3. **Round Robin (RR):** Preemptive. Each process gets a fixed **Time Quantum (TQ)**. Ideal for time-sharing systems.
4. **Priority Scheduling:** Each process is assigned a priority integer. Can lead to *Starvation* (solved by *Aging*).

#### 📊 Important Formulas:
- $\\text{Turnaround Time (TAT)} = \\text{Completion Time (CT)} - \\text{Arrival Time (AT)}$
- $\\text{Waiting Time (WT)} = \\text{Turnaround Time (TAT)} - \\text{Burst Time (BT)}$`;
    }

    if (/deadlock/i.test(q)) {
      return `### 🔒 Deadlock in Operating System (OSY)
A **Deadlock** occurs when a set of processes are blocked because each process is holding a resource and waiting for another resource held by another process.

#### 4 Necessary Coffman Conditions for Deadlock:
1. **Mutual Exclusion:** Resources cannot be shared simultaneously.
2. **Hold and Wait:** A process holds at least one resource while waiting for others.
3. **No Preemption:** Resources cannot be forcibly taken from a process.
4. **Circular Wait:** A closed chain of processes exists where each process waits for a resource held by the next.

#### 🛠️ Deadlock Handling:
- **Prevention:** Invalidate at least one of the 4 conditions.
- **Avoidance:** Banker's Algorithm (safe state detection).
- **Detection & Recovery:** Resource Allocation Graph (RAG) and process termination.`;
    }

    return `### 🖥️ Operating System (OSY - Course Code: 315319)
**MSBTE 5th Semester Computer Engineering (CO5I)**

#### 📚 5 Core Units:
1. **Unit I: OS Services & Components** — System Calls, OS Structures (Monolithic vs Microkernel), Dual-Mode Operation.
2. **Unit II: Process Management** — PCB (Process Control Block), Process States, IPC, Multithreading models.
3. **Unit III: CPU Scheduling** — FCFS, SJF, SRTF, Round Robin, Priority Scheduling, Gantt Charts.
4. **Unit IV: Memory Management** — Contiguous vs Non-contiguous, Paging, Segmentation, Virtual Memory, FIFO & LRU Page Replacement.
5. **Unit V: File Management & Disk Scheduling** — File Attributes, Directory structures, FCFS, SSTF, SCAN disk scheduling.

👉 *You can download the complete syllabus and solved lab manuals from our [Curriculum](/curriculum) and [Lab Manuals](/manuals) sections!*`;
  }

  // 4. Advanced Computer Networks (ACN - 315321)
  if (/(acn|315321|computer network|tcp|udp|ipv4|ipv6|subnet|osi model|router|switch)/i.test(q)) {
    return `### 🌐 Advanced Computer Networks (ACN - 315321)
**MSBTE 5th Semester Computer Engineering**

#### 🔑 Core Concepts:
- **OSI 7-Layer Model:** Physical ➔ Data Link ➔ Network ➔ Transport ➔ Session ➔ Presentation ➔ Application.
- **TCP vs UDP:**
  - **TCP:** Connection-oriented, reliable, guarantees packet delivery via 3-way handshake (SYN, SYN-ACK, ACK).
  - **UDP:** Connectionless, faster, no retransmission (used in live video streaming and gaming).
- **IPv4 vs IPv6:**
  - **IPv4:** 32-bit address (e.g. \`192.168.1.1\`), ~4.3 billion addresses.
  - **IPv6:** 128-bit hexadecimal address (e.g. \`2001:0db8:85a3::8a2e:0370:7334\`).
- **Routing Protocols:** Distance Vector (RIP), Link State (OSPF), Path Vector (BGP).`;
  }

  // 5. Data Analytics (DAN - 315326)
  if (/(data analytics|dan|315326|pandas|numpy|matplotlib|regression|machine learning|csv|data cleaning)/i.test(q)) {
    return `### 📊 Data Analytics (DAN - 315326)
**MSBTE 5th Semester Computer Engineering**

#### 🐍 Key Python Libraries:
\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Load dataset
df = pd.read_csv('student_data.csv')

# Data inspection & cleaning
print(df.head())
print(df.isnull().sum())
df.fillna(df.mean(numeric_only=True), inplace=True)

# Visualization
plt.hist(df['marks'], bins=10, color='skyblue', edgecolor='black')
plt.title('Marks Distribution')
plt.show()
\`\`\`

#### 📌 High-Weightage MSBTE Topics:
- NumPy Arrays, Indexing, Slicing & Reshaping
- Pandas DataFrames, Merging, GroupBy, and Handling Missing Values
- Exploratory Data Analysis (EDA) & Matplotlib / Seaborn Visualizations
- Linear Regression & Classification basics`;
  }

  // 6. Cloud Computing (CLO - 315325)
  if (/(cloud computing|clo|315325|aws|azure|iaas|paas|saas|virtualization|docker|hypervisor)/i.test(q)) {
    return `### ☁️ Cloud Computing (CLO - 315325)
**MSBTE 5th Semester Computer Engineering**

#### 🔹 Cloud Service Models (SPI):
1. **SaaS (Software as a Service):** End-user applications hosted in cloud (e.g. Google Workspace, Microsoft 365).
2. **PaaS (Platform as a Service):** Environment for building and deploying apps (e.g. Heroku, Google App Engine).
3. **IaaS (Infrastructure as a Service):** Virtualized computing resources, servers, and storage (e.g. AWS EC2, Azure VMs).

#### 🔹 Cloud Deployment Models:
- **Public Cloud:** Multi-tenant infrastructure (AWS, Azure, GCP).
- **Private Cloud:** Dedicated infrastructure for single organization.
- **Hybrid Cloud:** Mix of public and private clouds connected securely.
- **Community Cloud:** Shared infrastructure for specific organizations.`;
  }

  // 7. Software Engineering (SEN - 315323)
  if (/(software engineering|sen|315323|agile|scrum|waterfall|sdlc|srs|testing|dfd|use case)/i.test(q)) {
    return `### ⚙️ Software Engineering (SEN - 315323)
**MSBTE 5th Semester Computer Engineering**

#### 🔄 SDLC Models Comparison:
- **Waterfall Model:** Linear and sequential. Best when requirements are crystal clear and fixed.
- **Agile / Scrum:** Iterative and incremental. Focuses on customer collaboration, sprints (1-4 weeks), and adaptability.
- **Spiral Model:** Risk-driven model suited for large, high-risk projects.

#### 🧪 Testing Strategies:
- **Unit Testing:** Testing individual components/functions in isolation.
- **Integration Testing:** Testing interfaces between connected modules.
- **System Testing:** Testing the complete integrated software system against requirements.
- **Black-Box vs White-Box Testing:** Testing functionality without code knowledge vs internal logic testing.`;
  }

  // 8. Exam Preparation & MSBTE Passing Tips
  if (/(exam|preparation|tips|passing marks|study plan|how to study|important questions|imp|score good marks)/i.test(q)) {
    return `### 🎯 MSBTE Board Exam Preparation Strategy (70 Marks)

#### 📝 MSBTE 70-Mark Question Paper Pattern:
- **Q1 (10 Marks):** Attempt 5 out of 7 (2 marks each) — *Short definitions, formulas, acronyms*.
- **Q2 & Q3 (24 Marks):** Attempt 3 out of 4 (4 marks each) — *Diagrams, differences, step-by-step algorithms*.
- **Q4 & Q5 (24 Marks):** Attempt 3 out of 4 (4 marks each) — *Numerical problems (CPU Scheduling, Paging, Subnetting)*.
- **Q6 (12 Marks):** Attempt 2 out of 3 (6 marks each) — *Comprehensive case studies / code implementation*.

#### 💡 Golden Rules for Scoring 90%+:
1. **Neat Diagrams:** Draw labeled block diagrams in pencil for architecture and workflows.
2. **Solve 3 Years PYQs:** MSBTE repeats ~60-70% of core concepts across Summer & Winter papers.
3. **Point-Wise Answers:** Use bullet points and sub-headings instead of large unformatted paragraphs.
4. **Formulas & Gantt Charts:** Show complete step-by-step calculations with units.`;
  }

  // 9. Direct Second Year (DSE) Admissions
  if (/(dse|direct second year|engineering admission|cap round|cutoff|b\.?tech|b\.?e\.?)/i.test(q)) {
    return `### 🎓 Direct Second Year Engineering (DSE) Admission Guide
After completing your 3-year polytechnic diploma, you are eligible for direct admission to the 2nd Year (3rd Semester) of B.Tech / B.E. in Maharashtra.

#### 📌 Key Admission Steps:
1. **Aggregate Marks:** Admission is strictly based on your **5th & 6th Semester Diploma Aggregate percentage**.
2. **Document Verification:** Facilitation Center (FC) verification of Diploma Marksheets, Domicile, Caste/EWS (if applicable).
3. **CAP Rounds (Centralized Admission Process):**
   - **CAP Round 1:** Submit college option forms in preferential order.
   - **CAP Round 2 & 3:** Betterment rounds to secure top colleges like COEP, VJTI, PICT, SPIT, VIT Pune.
4. **Reservation & TFWS:** Tuition Fee Waiver Scheme (TFWS) is available for eligible meritorious students.`;
  }

  // 10. General Coding & Programming Questions
  if (/(code|program|python|javascript|c\+\+|java|sql|function|loop|array|pointer|object)/i.test(q)) {
    return `### 💻 Programming & Technical Support
I can help you write, debug, and explain code for all diploma engineering languages:

- **C / C++:** Pointers, Structures, OOPs, Memory Allocation (\`malloc\`/\`free\`), File Handling.
- **Java:** Classes, Inheritance, Exception Handling, Multithreading, JDBC.
- **Python:** Data Structures (Lists, Dictionaries, Tuples), Pandas, NumPy, File I/O.
- **Web Tech:** HTML5, CSS3, JavaScript, React, Node.js, REST APIs.
- **SQL & Databases:** DDL, DML, Joins, Triggers, Normalization (1NF, 2NF, 3NF, BCNF).

*Feel free to paste any specific code snippet, algorithm question, or error message and I'll explain it step-by-step!*`;
  }

  // 11. Contextual Fallback
  return `### 💡 College Mitra Guidance
I understand you are asking about: **"${userMessage.substring(0, 80)}"**

Here is how you can proceed:
- 📖 **Check Study Materials:** Browse our verified [Curriculum](/curriculum), [Lab Manuals](/manuals), and [Previous Year Papers](/pyqs).
- 🔍 **Be Specific:** You can ask me for definitions, code examples, comparison tables, or step-by-step algorithms (e.g., *"Explain Round Robin CPU scheduling with Gantt chart"* or *"Differentiate between IPv4 and IPv6"*).
- ❓ **Ask Anything:** Feel free to rephrase or ask any MSBTE diploma related question!`;
}

// POST /api/chat — Powered by Groq AI (LLaMA 3), Gemini AI, and College Mitra Knowledge Engine
router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const latestUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || '';
  const groqKey = cleanKey(process.env.GROQ_API_KEY);
  const geminiKey = cleanKey(process.env.GEMINI_API_KEY);

  // ── 1. Try Groq AI (LLaMA 3.3 70B, Fast & Accurate) ──────────────────────
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

  // ── 3. Intelligent Built-in College Mitra Knowledge Engine (Always Available) ──
  const smartReply = getSmartKnowledgeResponse(latestUserMessage);
  return res.status(200).json({ reply: smartReply });
});

module.exports = router;
