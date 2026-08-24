# CHAPTER 8
## DETAILED REPORT ON TASK UNDERTAKEN
why
### INTRODUCTION
The main objective of the project was to develop **College Sahayak**, a comprehensive, full-stack educational web application designed specifically for MSBTE polytechnic diploma students in Maharashtra. The system acts as a centralized digital platform, allowing students to access verified academic resources such as K-Scheme curriculum details, lab manuals, manual answers, previous year question papers (PYQs), microprojects, and lecture notes. 

A standout feature of the platform is **College Mitra**, an integrated AI-powered academic counselor that provides real-time, streaming responses to student queries, including code generation and MSBTE-specific exam guidance. The application uses a React.js (Vite) frontend for a lightning-fast user experience, a Node.js and Express.js backend for robust API handling, and Supabase (PostgreSQL) for secure database management and feedback collection. The project provided deep hands-on experience in the complete software development lifecycle, including modern frontend architecture, RESTful API design, AI/LLM integration (Groq API), SEO optimization, deployment, and version control.

### TECHNOLOGIES USED (IN DETAIL)

**Frontend Technologies:**
• **React.js (Vite)**
React.js was used as the core library to develop the highly interactive frontend of College Sahayak. Vite was utilized as the build tool to ensure lightning-fast compilation and optimized production builds. Components were created for Home, Curriculum, Lab Manuals, Microprojects, Notes, Question Papers, and the AI Chatbot interface.

• **React Router DOM**
React Router DOM was implemented for seamless client-side routing, enabling smooth navigation between different resource pages without reloading the web browser.

• **React Helmet Async**
Used extensively for Technical SEO (Search Engine Optimization). It allowed dynamic injection of metadata, titles, and K-Scheme specific keywords into the `<head>` of every page to ensure high rankings on Google Search.

• **React Icons & Lucide React**
These libraries were used to integrate modern, crisp SVG icons across the user interface, enhancing the visual hierarchy of the navigation bar, resource cards, and the chatbot interface.

• **HTML5 & CSS3**
HTML5 provided the semantic structural foundation of the platform. CSS3 was heavily utilized to design a premium, modern aesthetic—incorporating dynamic hover effects, glassmorphism, responsive grid layouts, and smooth micro-animations that adapt flawlessly to both mobile and desktop screens.

**Backend Technologies:**
• **Node.js**
Node.js served as the server-side runtime environment. It efficiently handled asynchronous operations, API requests, AI stream processing, and secure communication with the database.

• **Express.js**
Express.js was used to build the RESTful backend architecture. It managed routing for various endpoints, including fetching dynamic study materials, submitting user feedback, and handling the complex Server-Sent Events (SSE) required for the AI chatbot.

• **Supabase (PostgreSQL)**
Supabase was utilized as the primary database management system. It securely stores dynamic platform data, such as the admin feedback inbox, using relational tables.

• **Groq API (LLM Integration)**
Groq's lightning-fast inference engine was integrated to power the **College Mitra** AI chatbot. Standard LLMs (like gpt-oss-20b/Llama 3) were securely connected via the backend to provide students with real-time, streaming academic assistance and programming code generation.

• **REST API & Server-Sent Events (SSE)**
Standard REST APIs handled data fetching and form submissions, while SSE was specifically implemented to stream the AI chatbot's responses word-by-word in real-time, drastically improving the user experience.

**DEVELOPMENT TOOLS:**
• **Visual Studio Code**
Served as the primary Integrated Development Environment (IDE) for writing, debugging, and managing the full-stack source code.

• **Postman**
Used extensively for API testing and validation. It ensured that the Express backend and AI integration routes were returning the correct data payloads and streaming formats before frontend integration.

• **Git & GitHub**
Git was used for strict version control, tracking codebase changes, and preventing data loss. GitHub hosted the repository, serving as the central hub for deployment triggers and source code backup.

• **Vercel & Render**
Vercel was used to deploy the React frontend globally for ultra-low latency access. Render was used to host the Node.js backend, configured with a cron-job to ensure 24/7 uptime and instant AI responses.
