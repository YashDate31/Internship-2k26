# Day 62 - Final Internship Review, Viva & Presentation Guide

**Date:** 14th August 2026 (Fri)  
**Status:** Project 99% Completed & Reviewed by Faculty Mentor  
**Company:** Somayu Infotech, Narayangaon (Pune)

---

## 🏆 Mentor Review & Project Evaluation
- **Feedback:** Sir reviewed the complete **College Sahayak** portal (Auth, 10 Resource Categories, Brevo OTP, Gemini AI Chatbot, My Document feature, and Responsive UI).
- **Rating:** Highly appreciated project structure, UI responsiveness, and real-world utility for college students.

---

## 📚 Viva Voce Preparation Guide

### 1. Web Development & Frontend (HTML, CSS, React)
- **Q: What is the benefit of using React components over plain HTML?**  
  *A:* Reusability, component-driven architecture, efficient rendering using Virtual DOM, and easy state management.
- **Q: How does Flexbox differ from CSS Grid?**  
  *A:* Flexbox is one-dimensional (row or column layout), while CSS Grid is two-dimensional (rows and columns simultaneously).

### 2. Backend & API Engineering (Node.js, Express, Flask)
- **Q: How does 2-Step Authentication work in College Sahayak?**  
  *A:* When a user logs in, a cryptographically secure 6-digit OTP is generated and dispatched via the Brevo SMTP API to the user's registered email before granting session tokens.
- **Q: How is Gemini AI integrated into the chatbot?**  
  *A:* Uses Google's `@google/generative-ai` SDK to route student queries to Gemini 1.5 Flash model with system prompts tuned for academic assistance.

### 3. Database & Security
- **Q: Why hash passwords before storing them in MySQL?**  
  *A:* Storing plain-text passwords is a critical security vulnerability. Hashing (e.g. bcrypt) ensures passwords cannot be reversed even if database records are accessed.
