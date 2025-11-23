class User {
  constructor(data) {
    this.walletAddress = data.walletAddress;
    this.sessionPublicKey = data.sessionPublicKey;
    this.sessionPrivateKey = data.sessionPrivateKey;
    this.balance = data.balance || 0;
    this.role = data.role || 'listener'; // 'listener' or 'artist'
    this.listeningTime = data.listeningTime || 0;
    this.likedTracks = data.likedTracks || [];
    this.createdAt = data.createdAt || new Date().toISOString();
  }
}

const users = new Map();

module.exports = { User, users };