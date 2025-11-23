const express = require('express');
const router = express.Router();
const geminiService = require('../services/geminiService');

router.post('/playlist', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const playlist = await geminiService.generatePlaylist(prompt);
    res.json({ playlist });
  } catch (error) {
    console.error('Generate playlist error:', error);
    res.status(500).json({ error: 'Failed to generate playlist' });
  }
});

router.post('/description', async (req, res) => {
  try {
    const { title, genre } = req.body;
    
    if (!title || !genre) {
      return res.status(400).json({ error: 'Title and genre are required' });
    }

    const description = await geminiService.generateDescription(title, genre);
    res.json({ description });
  } catch (error) {
    console.error('Generate description error:', error);
    res.status(500).json({ error: 'Failed to generate description' });
  }
});

module.exports = router;