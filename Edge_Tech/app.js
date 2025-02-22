require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB Connection
mongoose.connect(MONGO_URI, {
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Middleware
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");

// Serve EJS form at homepage
app.get("/api/chat", (req, res) => {
    res.render("index");
});

// Routes
app.use('/api', chatRoutes);
app.use('/api/about', (req, res) => {
    res.render('about');
})

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
