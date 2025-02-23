const Chat = require("../models/chat");
const { getAIResponse } = require("../services/aiService");
const chat = require("../models/chat")
/**
 * Handles user chat requests, retrieves AI response, and stores the conversation in MongoDB.
 * @param {Object} req - The request object containing user message and session ID.
 * @param {Object} res - The response object to send AI reply.
 */
async function handleChat(req, res) {
    try {
        let { message, sessionId } = req.body;

        // ✅ Validate input
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }
        if (!sessionId) {
            return res.status(400).json({ error: "Session ID is required" });
        }

        // ✅ Fetch last 5 messages for context (if available)
        const chatHistory = await Chat.find({ sessionId })
            .sort({ timestamp: 1 })
            .limit(5);

        // ✅ Get AI response using chat history for context
        const aiResponse = await getAIResponse(chatHistory, message);

        // ✅ Save the new message & response in MongoDB
        const chatEntry = new Chat({ sessionId, userMessage: message, botResponse: aiResponse });
        await chatEntry.save();

        // ✅ Send AI response back to client
        res.json({ sessionId, response: aiResponse });

    } catch (error) {
        console.error("❌ Chatbot Error:", error);
        res.status(500).json({ error: "AI failed to respond." });
    }
}

module.exports = { handleChat };
