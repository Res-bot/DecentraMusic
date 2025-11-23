const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generatePlaylist = async (prompt) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return [
        { title: 'Simulation Song 1', artist: 'AI Bot', reason: 'API Key missing' },
        { title: 'Simulation Song 2', artist: 'AI Bot', reason: 'API Key missing' }
      ];
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const result = await model.generateContent(
      `Create a playlist of 5 songs based on this mood/request: "${prompt}". 
       Return ONLY a valid JSON array with objects containing: title, artist, and reason fields.
       Example: [{"title": "Song Name", "artist": "Artist Name", "reason": "Why it fits"}]`
    );

    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return [];
  } catch (error) {
    console.error('Gemini API Error:', error);
    return [];
  }
};

exports.generateDescription = async (title, genre) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return 'AI Description unavailable (API Key missing).';
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const result = await model.generateContent(
      `Write a short, punchy, 2-sentence marketing description for a new music track titled "${title}" in the genre "${genre}". 
       Make it sound professional and exciting.`
    );

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'Error generating description.';
  }
};