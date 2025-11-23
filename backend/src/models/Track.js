// In-memory storage (replace with database in production)
class Track {
  constructor(data) {
    this.id = data.id || Date.now().toString();
    this.title = data.title;
    this.artist = data.artist;
    this.artistAddress = data.artistAddress;
    this.genre = data.genre;
    this.duration = data.duration || 180;
    this.streamCost = data.streamCost || 0.0001;
    this.coverUrl = data.coverUrl || 'https://via.placeholder.com/300';
    this.ipfsCid = data.ipfsCid;
    this.description = data.description || '';
    this.streams = data.streams || 0;
    this.revenue = data.revenue || 0;
    this.createdAt = data.createdAt || new Date().toISOString();
  }
}

// In-memory database
const tracks = new Map();

// Initial mock data
const mockTracks = [
  {
    id: '1',
    title: 'Ethereal Dreams',
    artist: 'CryptoBeats',
    artistAddress: '0x1234...5678',
    genre: 'Electronic',
    duration: 263,
    streamCost: 0.0001,
    coverUrl: 'https://picsum.photos/seed/track1/300',
    streams: 120000,
    revenue: 12.0
  },
  {
    id: '2',
    title: 'Digital Horizon',
    artist: 'BlockTunes',
    artistAddress: '0x2345...6789',
    genre: 'Synthwave',
    duration: 238,
    streamCost: 0.0001,
    coverUrl: 'https://picsum.photos/seed/track2/300',
    streams: 98000,
    revenue: 9.8
  },
  {
    id: '3',
    title: 'Neon Nights',
    artist: 'Web3Music',
    artistAddress: '0x3456...7890',
    genre: 'Cyberpunk',
    duration: 312,
    streamCost: 0.00015,
    coverUrl: 'https://picsum.photos/seed/track3/300',
    streams: 85600,
    revenue: 12.84
  },
  {
    id: '4',
    title: 'Stellar Voyage',
    artist: 'DeFiBeats',
    artistAddress: '0x4567...8901',
    genre: 'Ambient',
    duration: 241,
    streamCost: 0.0001,
    coverUrl: 'https://picsum.photos/seed/track4/300',
    streams: 74500,
    revenue: 7.45
  },
  {
    id: '5',
    title: 'Quantum Beats',
    artist: 'ChainMelody',
    artistAddress: '0x5678...9012',
    genre: 'Electronic',
    duration: 213,
    streamCost: 0.0001,
    coverUrl: 'https://picsum.photos/seed/track5/300',
    streams: 63200,
    revenue: 6.32
  },
  {
    id: '6',
    title: 'Cyber Symphony',
    artist: 'TokenTunes',
    artistAddress: '0x6789...0123',
    genre: 'Orchestra',
    duration: 375,
    streamCost: 0.0002,
    coverUrl: 'https://picsum.photos/seed/track6/300',
    streams: 52100,
    revenue: 10.42
  }
];

mockTracks.forEach(track => {
  const newTrack = new Track(track);
  tracks.set(newTrack.id, newTrack);
});

module.exports = { Track, tracks };