const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getAIResponse(chatHistory, userMessage) {
    try {
        // ✅ Combine chat history and new message as context
        let context = chatHistory.map(chat => `User: ${chat.userMessage}\nAI: ${chat.botResponse}`).join("\n");
        context += `\nUser: ${userMessage}\nAI: `; // Append new message

        // ✅ Send formatted conversation history to AI
        const result = await model.generateContent({
            contents: [
                {
                    parts: [
                        {
                            text: context
                        }
                    ]
                }
            ]
        });

        // ✅ Extract response
        const aiResponse = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond.";


        return aiResponse;
    } catch (error) {
        console.error("❌ Gemini API Error:", error);
        return "I'm facing some issues right now. Please try again later!";
    }
}

module.exports = { getAIResponse };
