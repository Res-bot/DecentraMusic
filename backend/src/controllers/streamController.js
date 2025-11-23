const { paymentGatekeeper } = require('../middleware/x402');
const { tracks } = require('../models/Track');

exports.requestStream = async (req, res) => {
  const { songId } = req.params;
  
  // This will be intercepted by paymentGatekeeper middleware
  // If it reaches here, payment is verified
  
  const track = tracks.get(songId);
  if (!track) {
    return res.status(404).json({ error: 'Track not found' });
  }

  // In production, stream from IPFS
  const MOCK_AUDIO = `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(parseInt(songId) % 6) + 1}.mp3`;
  
  res.json({ 
    success: true,
    streamUrl: MOCK_AUDIO,
    track: {
      id: track.id,
      title: track.title,
      artist: track.artist,
      duration: track.duration
    }
  });
};