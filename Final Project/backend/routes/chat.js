const express = require('express');
const router = express.Router();

// Helper to clean API Key string
function cleanKey(key) {
  return (key || '').replace(/^[ '"\r\n]+|[ '"\r\n]+$/g, '').trim();
}

// System persona for College Mitra
const systemPrompt = `You are College Mitra, an intelligent, friendly, and expert AI academic counselor designed for polytechnic diploma students (MSBTE curriculum) in Maharashtra.
You provide clear, accurate, and structured answers in clean Markdown formatting.
When asked programming questions, provide complete code with explanations.
When asked about MSBTE subjects, exams, or career advice (like DSE admission), provide practical and helpful guidance.`;

// Code Generator for standard programming queries
function getAlgorithmOrCode(q) {
  const query = q.toLowerCase();

  // Binary Search
  if (query.includes('binary search')) {
    return `### 🔍 Binary Search Algorithm
Binary search is an efficient $O(\\log n)$ algorithm for finding an element in a **sorted array** by repeatedly dividing the search interval in half.

\`\`\`python
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid  # Target found at index mid
        elif arr[mid] < target:
            low = mid + 1  # Search right half
        else:
            high = mid - 1 # Search left half

    return -1 # Target not found

# Example Usage:
numbers = [10, 23, 35, 47, 59, 72, 88, 91]
target = 59
result = binary_search(numbers, target)

if result != -1:
    print(f"Element {target} found at index {result}")
else:
    print("Element not found")
\`\`\`

#### ⏱️ Complexity:
- **Time Complexity:** Best: $O(1)$, Average/Worst: $O(\\log n)$
- **Space Complexity:** $O(1)$ (Iterative)`;
  }

  // Bubble Sort
  if (query.includes('bubble sort')) {
    return `### 🫧 Bubble Sort Algorithm
Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.

\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

# Example:
data = [64, 34, 25, 12, 22, 11, 90]
print("Sorted Array:", bubble_sort(data))
\`\`\`

#### ⏱️ Complexity:
- **Time Complexity:** Best: $O(n)$, Average/Worst: $O(n^2)$
- **Space Complexity:** $O(1)$`;
  }

  // Stack Implementation
  if (query.includes('stack') && (query.includes('program') || query.includes('code') || query.includes('implement') || query.includes('push') || query.includes('pop'))) {
    return `### 📚 Stack Data Structure (LIFO - Last In, First Out)

\`\`\`python
class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)
        print(f"Pushed: {item}")

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return "Stack Underflow!"

    def peek(self):
        return self.items[-1] if not self.is_empty() else None

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

# Usage:
s = Stack()
s.push(10)
s.push(20)
print("Top element:", s.peek())
print("Popped:", s.pop())
\`\`\``;
  }

  // Fibonacci
  if (query.includes('fibonacci')) {
    return `### 🔢 Fibonacci Series

\`\`\`python
def fibonacci(n):
    a, b = 0, 1
    series = []
    for _ in range(n):
        series.append(a)
        a, b = b, a + b
    return series

# First 10 Fibonacci numbers
print("Fibonacci Series:", fibonacci(10))
# Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
\`\`\``;
  }

  // Factorial
  if (query.includes('factorial')) {
    return `### ❗ Factorial Calculation

\`\`\`python
def factorial(n):
    if n < 0:
        return "Invalid input"
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)

print("5! =", factorial(5)) # Output: 120
\`\`\``;
  }

  // Palindrome
  if (query.includes('palindrome')) {
    return `### 🔁 Palindrome Check

\`\`\`python
def is_palindrome(s):
    cleaned = ''.join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]

print(is_palindrome("radar"))      # True
print(is_palindrome("race a car")) # False
print(is_palindrome("A man a plan a canal Panama")) # True
\`\`\``;
  }

  // SQL Join
  if (query.includes('sql') && (query.includes('join') || query.includes('query'))) {
    return `### 🗄️ SQL Joins Explained

\`\`\`sql
-- 1. INNER JOIN (Matching records in both tables)
SELECT Students.name, Departments.dept_name
FROM Students
INNER JOIN Departments ON Students.dept_id = Departments.dept_id;

-- 2. LEFT JOIN (All students + matched departments)
SELECT Students.name, Departments.dept_name
FROM Students
LEFT JOIN Departments ON Students.dept_id = Departments.dept_id;

-- 3. GROUP BY with Aggregation
SELECT dept_id, COUNT(*) as total_students, AVG(marks) as avg_score
FROM Students
GROUP BY dept_id
HAVING AVG(marks) > 75;
\`\`\``;
  }

  return null;
}

// Live Wikipedia Knowledge Fetcher
async function fetchWikipediaSummary(query) {
  try {
    const cleanSearch = query
      .replace(/^(what is|who is|explain|tell me about|define|describe|how does|what are|who was)\s+/i, '')
      .replace(/[?.,!]/g, '')
      .trim();

    if (!cleanSearch || cleanSearch.length < 2) return null;

    const sRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanSearch)}&format=json&origin=*`, {
      headers: { 'User-Agent': 'CollegeSahayak/1.0 (academic counselor bot)' }
    });

    if (!sRes.ok) return null;
    const sData = await sRes.json();

    if (sData.query?.search?.length > 0) {
      const topTitle = sData.query.search[0].title;
      const sumRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topTitle)}`, {
        headers: { 'User-Agent': 'CollegeSahayak/1.0 (academic counselor bot)' }
      });

      if (sumRes.ok) {
        const sumData = await sumRes.json();
        if (sumData.extract && sumData.extract.length > 25) {
          return `### 📖 **${sumData.title}**\n\n${sumData.extract}\n\n*Source: Academic Encyclopedia Knowledge Base*`;
        }
      }
    }
  } catch (err) {
    console.error('Wikipedia fetch error:', err.message);
  }
  return null;
}

// Smart Academic Engine
function getAcademicResponse(q) {
  const query = (q || '').toLowerCase().trim();

  // 1. Greetings
  if (/^(hey|hi|hello|namaste|hola|good\s*(morning|afternoon|evening)|yo|sup)\b/i.test(query)) {
    return `### 👋 Hello! I'm **College Mitra**
I am your AI academic and career counselor for **MSBTE Polytechnic Diploma** studies.

Here is what you can ask me:
- 📚 **Subjects & Concepts:** Operating Systems (OSY), Computer Networks (ACN), Data Analytics (DAN), Cloud Computing (CLO), Software Engineering (SEN)
- 💻 **Programming & Code:** Python, C/C++, Java, SQL, JavaScript, Web Development
- ⚡ **Algorithms & Logic:** CPU Scheduling, Page Replacement, Binary Search, Sorting
- 📝 **MSBTE Exam Prep:** 70-mark paper patterns, important topics, scoring tips
- 🎓 **DSE Admissions:** Direct Second Year engineering cutoff, CAP rounds, eligibility

What would you like help with today?`;
  }

  // 2. Founder & College Sahayak
  if (/(who (made|created|developed|built|are)|about|founder|developer|yash).*(you|college sahayak|platform|website|yash|founder|creator)/i.test(query) || /(who created|who made|founder of|developer of|yash date)/i.test(query)) {
    return `### 🎓 About College Sahayak & College Mitra
**College Sahayak** is Maharashtra's dedicated digital platform designed to provide MSBTE diploma students with free, verified academic resources.

- 👨‍💻 **Founder & Solo Developer:** **Yash Vijay Date**
- 🎯 **Mission:** Centralize all diploma resources (Curriculum, Manuals, PYQs, Notes, and Micro-Projects) with zero clutter and lightning-fast access.
- 🤖 **College Mitra:** The built-in AI counseling assistant powered by modern language models and MSBTE curriculum data.

You can learn more on our [About Page](/about) or browse study materials in the navigation bar!`;
  }

  // 3. Operating System (OSY - 315319)
  if (/\b(operating system|osy|315319|process management|cpu scheduling|paging|deadlock|semaphore|threads?)\b/i.test(query)) {
    if (/\b(cpu scheduling|fcfs|sjf|round robin|priority scheduling)\b/i.test(query)) {
      return `### ⚡ CPU Scheduling in Operating System (OSY - 315319)
CPU scheduling decides which process gets CPU time when the CPU becomes idle.

#### 🔹 Key Scheduling Algorithms:
1. **FCFS (First-Come, First-Served):** Non-preemptive. Simple FIFO queue execution. Can suffer from *Convoy Effect*.
2. **SJF (Shortest Job First):** Non-preemptive or Preemptive (SRTF). Selects process with shortest burst time. Gives minimal average waiting time.
3. **Round Robin (RR):** Preemptive. Each process receives a fixed **Time Quantum (TQ)**. Ideal for interactive systems.
4. **Priority Scheduling:** Processes executed based on priority numbers. Solves starvation using *Aging*.

#### 📊 Turnaround & Waiting Time Formulas:
- $\\text{Turnaround Time (TAT)} = \\text{Completion Time (CT)} - \\text{Arrival Time (AT)}$
- $\\text{Waiting Time (WT)} = \\text{Turnaround Time (TAT)} - \\text{Burst Time (BT)}$`;
    }

    if (/deadlock/i.test(query)) {
      return `### 🔒 Deadlock in Operating System (OSY)
A **Deadlock** occurs when a set of processes are blocked because each process is holding a resource and waiting for another resource held by another process.

#### 4 Necessary Coffman Conditions:
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
  if (/\b(acn|315321|computer networks?|tcp|udp|ipv4|ipv6|subnetting|osi model|router|switch)\b/i.test(query)) {
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
  if (/\b(data analytics|dan|315326|pandas|numpy|matplotlib|regression|machine learning|csv|data cleaning)\b/i.test(query)) {
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
  if (/\b(cloud computing|clo|315325|aws|azure|iaas|paas|saas|virtualization|docker|hypervisor)\b/i.test(query)) {
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
  if (/\b(software engineering|sen|315323|agile|scrum|waterfall|sdlc|srs|testing|dfd|use case)\b/i.test(query)) {
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
  if (/(exam|preparation|tips|passing marks|study plan|how to study|important questions|imp|score good marks)/i.test(query)) {
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
  if (/(dse|direct second year|engineering admission|cap round|cutoff|b\.?tech|b\.?e\.?)/i.test(query)) {
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

  return null;
}

// POST /api/chat — Multi-tier AI Chat Route
router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const latestUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || '';
  const rawMsg = latestUserMessage.trim();
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
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${geminiKey}`
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

  // ── 3. Instant Math & Expression Evaluator ───────────────────────────────
  const mathMatch = rawMsg.match(/^(\d+(\.\d+)?\s*[\+\-\*\/\%]\s*\d+(\.\d+)?(\s*[\+\-\*\/\%]\s*\d+(\.\d+)?)*)$/);
  if (mathMatch) {
    try {
      const expr = mathMatch[1].replace(/\s+/g, '');
      const result = Function('"use strict";return (' + expr + ')')();
      return res.status(200).json({ reply: `The calculated result of **${expr}** is **${result}**.` });
    } catch (e) {}
  }

  // ── 4. Code & Algorithm Generator ─────────────────────────────────────────
  const codeReply = getAlgorithmOrCode(rawMsg);
  if (codeReply) {
    return res.status(200).json({ reply: codeReply });
  }

  // ── 5. MSBTE Academic & Curriculum Engine ────────────────────────────────
  const academicReply = getAcademicResponse(rawMsg);
  if (academicReply) {
    return res.status(200).json({ reply: academicReply });
  }

  // ── 6. Live Dynamic Knowledge Search Engine (Wikipedia) ──────────────────
  const wikiReply = await fetchWikipediaSummary(rawMsg);
  if (wikiReply) {
    return res.status(200).json({ reply: wikiReply });
  }

  // ── 7. Comprehensive Academic Fallback ───────────────────────────────────
  return res.status(200).json({
    reply: `### 💡 College Mitra Guidance
I understand you are asking about: **"${rawMsg.substring(0, 80)}"**

Here are some helpful options:
- 📖 **Check Study Materials:** Explore our verified [Curriculum](/curriculum), [Lab Manuals](/manuals), and [Previous Year Papers](/pyqs).
- 🔍 **Ask for Code or Concepts:** Try asking *"Write binary search in Python"*, *"Explain CPU scheduling in OSY"*, or *"How to prepare for MSBTE board exams"*.
- 💬 **Ask Details:** Feel free to provide more details about your specific question!`
  });
});

module.exports = router;
