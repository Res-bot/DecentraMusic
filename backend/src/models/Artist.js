class Artist {
  constructor(data) {
    this.id = data.id || Date.now().toString();
    this.name = data.name;
    this.walletAddress = data.walletAddress;
    this.bio = data.bio || '';
    this.profileImage = data.profileImage || 'https://via.placeholder.com/150';
    this.totalStreams = data.totalStreams || 0;
    this.totalRevenue = data.totalRevenue || 0;
    this.trackCount = data.trackCount || 0;
    this.createdAt = data.createdAt || new Date().toISOString();
  }
}

const artists = new Map();

module.exports = { Artist, artists };