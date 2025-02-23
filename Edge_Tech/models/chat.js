const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },  // Unique session per user
    userMessage: { type: String, required: true },
    botResponse: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);

