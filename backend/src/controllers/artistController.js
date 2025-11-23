const { tracks } = require('../models/Track');
const { Artist, artists } = require('../models/Artist');

exports.getArtistStats = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    
    const artistTracks = Array.from(tracks.values())
      .filter(t => t.artistAddress.toLowerCase() === walletAddress.toLowerCase());

    const totalStreams = artistTracks.reduce((sum, t) => sum + t.streams, 0);
    const totalRevenue = artistTracks.reduce((sum, t) => sum + t.revenue, 0);
    
    const topTrack = artistTracks.sort((a, b) => b.streams - a.streams)[0];

    const stats = {
      totalStreams,
      totalRevenue,
      trackCount: artistTracks.length,
      topTrack: topTrack ? {
        title: topTrack.title,
        streams: topTrack.streams
      } : null,
      recentTracks: artistTracks.slice(0, 5)
    };

    res.json({ stats });
  } catch (error) {
    console.error('Get artist stats error:', error);
    res.status(500).json({ error: 'Failed to fetch artist stats' });
  }
};

exports.getArtistTracks = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    
    const artistTracks = Array.from(tracks.values())
      .filter(t => t.artistAddress.toLowerCase() === walletAddress.toLowerCase())
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ tracks: artistTracks });
  } catch (error) {
    console.error('Get artist tracks error:', error);
    res.status(500).json({ error: 'Failed to fetch artist tracks' });
  }
};