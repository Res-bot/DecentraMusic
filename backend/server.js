const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Routes
const authRoutes = require('./src/routes/auth');
const trackRoutes = require('./src/routes/tracks');
const artistRoutes = require('./src/routes/artists');
const streamRoutes = require('./src/routes/stream');
const geminiRoutes = require('./src/routes/gemini');

app.use('/api/auth', authRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/stream', streamRoutes);
app.use('/api/gemini', geminiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'DecentraMusic API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 DecentraMusic Backend running on port ${PORT}`);
});