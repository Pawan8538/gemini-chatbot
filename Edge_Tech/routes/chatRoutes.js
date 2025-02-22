const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/chatController');
const Chat = require('../models/chat');

router.post('/chat', handleChat);

// ✅ Fetch chat history for a session
router.get('/chat/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        if (!sessionId) {
            return res.status(400).json({ error: "Session ID is required" });
        }

        const chatHistory = await Chat.find({ sessionId }).sort({ timestamp: 1 }).limit(10);
        res.json(chatHistory.length > 0 ? chatHistory : []);
    } catch (error) {
        console.error("❌ Error fetching chat history:", error);
        res.status(500).json({ error: "Failed to fetch chat history" });
    }
});



router.delete('/chat/clear/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        await Chat.deleteMany({ sessionId });
        res.json({ message: "Chat history cleared successfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to clear chat history." });
    }
});




module.exports = router;


