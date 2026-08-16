// Day 67: Gemini API AI Chatbot Integration (10 Aug 2026)
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'API_KEY_PLACEHOLDER');

async function askCollegeSahayakBot(userQuestion) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(`System: You are College Sahayak AI Assistant.\n\nQuestion: ${userQuestion}`);
        const response = await result.response;
        return { success: true, answer: response.text() };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

module.exports = { askCollegeSahayakBot };
