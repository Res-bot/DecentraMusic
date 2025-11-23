const { Track, tracks } = require('../models/Track');
const { artists } = require('../models/Artist');

exports.getAllTracks = async (req, res) => {
  try {
    const { genre, search, limit = 50 } = req.query;

    let trackList = Array.from(tracks.values());

    // Filter by genre
    if (genre) {
      trackList = trackList.filter(t =>
        t.genre.toLowerCase() === genre.toLowerCase()
      );
    }

    // Search by title or artist
    if (search) {
      const searchLower = search.toLowerCase();
      trackList = trackList.filter(t =>
        t.title.toLowerCase().includes(searchLower) ||
        t.artist.toLowerCase().includes(searchLower)
      );
    }

    // Limit results
    trackList = trackList.slice(0, parseInt(limit));

    res.json({ tracks: trackList });
  } catch (error) {
    console.error('Get tracks error:', error);
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
};

exports.getTrackById = async (req, res) => {
  try {
    const { id } = req.params;
    const track = tracks.get(id);

    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }

    res.json({ track });
  } catch (error) {
    console.error('Get track error:', error);
    res.status(500).json({ error: 'Failed to fetch track' });
  }
};

exports.getTrendingTracks = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const trackList = Array.from(tracks.values())
      .sort((a, b) => b.streams - a.streams)
      .slice(0, parseInt(limit));

    res.json({ tracks: trackList });
  } catch (error) {
    console.error('Get trending tracks error:', error);
    res.status(500).json({ error: 'Failed to fetch trending tracks' });
  }
};

exports.uploadTrack = async (req, res) => {
  try {
    const {
      title,
      artist,
      artistAddress,
      genre,
      duration,
      streamCost,
      coverUrl,
      description
    } = req.body;

    if (!title || !artist || !artistAddress || !genre) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }

    const newTrack = new Track({
      title,
      artist,
      artistAddress: artistAddress.toLowerCase(),
      genre,
      duration: duration || 180,
      streamCost: streamCost || 0.0001,
      coverUrl: coverUrl || `https://picsum.photos/seed/${Date.now()}/300`,
      description,
      audioFile: req.file.filename,
      audioUrl: `/uploads/${req.file.filename}`
    });

    tracks.set(newTrack.id, newTrack);

    // Update artist stats
    const artistData = artists.get(artistAddress.toLowerCase());
    if (artistData) {
      artistData.trackCount += 1;
    }

    res.json({
      success: true,
      track: newTrack,
      message: 'Track uploaded successfully'
    });
  } catch (error) {
    console.error('Upload track error:', error);
    res.status(500).json({ error: 'Failed to upload track' });
  }
};

exports.incrementStream = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const track = tracks.get(id);
    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }

    track.streams += 1;
    track.revenue += parseFloat(amount || track.streamCost);

    res.json({
      success: true,
      streams: track.streams,
      revenue: track.revenue
    });
  } catch (error) {
    console.error('Increment stream error:', error);
    res.status(500).json({ error: 'Failed to increment stream' });
  }
};