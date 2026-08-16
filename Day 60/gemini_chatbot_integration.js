// Day 60: Gemini API AI Chatbot Integration for College Sahayak
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'API_KEY_PLACEHOLDER');

async function askCollegeSahayakBot(userQuestion) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const systemPrompt = "You are College Sahayak AI Assistant. Provide helpful, concise answers to college students regarding engineering subjects, exam preparation, lab manuals, and notes.";
        
        const result = await model.generateContent(`${systemPrompt}\n\nStudent Question: ${userQuestion}`);
        const response = await result.response;
        const answer = response.text();
        return { success: true, answer };
    } catch (error) {
        console.error('Gemini API Integration Error:', error);
        return { success: false, error: 'Failed to generate response from Gemini AI.' };
    }
}

module.exports = { askCollegeSahayakBot };
