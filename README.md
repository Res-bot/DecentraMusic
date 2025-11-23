# 🎵 DecentraMusic - Decentralized Music Streaming Platform

A Web3-powered music streaming platform that enables artists to upload tracks and listeners to stream music using blockchain-based micropayments. Built with React, Node.js, Express, and Arbitrum Stylus smart contracts.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![Rust](https://img.shields.io/badge/rust-1.82.0-orange.svg)

## ✨ Features

### 🎤 For Artists
- *Track Upload*: Upload MP3 files with metadata (title, genre, description)
- *AI-Powered Descriptions*: Generate professional track descriptions using Google Gemini AI
- *Dashboard Analytics*: View total streams, revenue, and track performance
- *Revenue Tracking*: Real-time earnings from stream micropayments
- *NFT Minting*: Each track is minted as an NFT on the blockchain

### 🎧 For Listeners
- *Music Discovery*: Browse trending tracks and all available music
- *AI Playlist Curator*: Describe your mood and let Gemini AI find matching tracks
- *Streaming*: Stream music with per-play micropayments
- *Wallet Integration*: Connect MetaMask for seamless payments
- *Balance Management*: Deposit ETH to stream music

### 🔗 Blockchain Features
- *MetaMask Integration*: Secure wallet connection
- *Arbitrum Stylus Smart Contract*: High-performance Rust-based contract
- *Micropayments*: Pay-per-stream model with ETH
- *Session Keys*: Secure, gasless streaming sessions
- *Real-time Balance Updates*: Track your spending and earnings

## 🏗 Architecture


decentralized-music-platform/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── api/             # API client functions
│   │   ├── abi/             # Smart contract ABIs
│   │   ├── components/      # React components
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # Business logic services
│   │   └── App.jsx          # Main application component
│   └── package.json
│
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   └── utils/           # Utility functions
│   ├── uploads/             # Uploaded MP3 files
│   └── server.js            # Express server entry point
│
└── contracts/               # Rust smart contract (Arbitrum Stylus)
    ├── src/
    │   ├── lib.rs           # Contract implementation
    │   └── main.rs          # Binary entry point
    ├── Cargo.toml           # Rust dependencies
    └── rust-toolchain.toml  # Rust version specification


## 🚀 Getting Started

### Prerequisites

- *Node.js* >= 18.0.0
- *npm* >= 9.0.0
- *Rust* >= 1.82.0 (for smart contract development)
- *Cargo* (Rust package manager)
- *MetaMask* browser extension
- *Git*

### Installation

1. *Clone the repository*
bash
git clone <repository-url>
cd decentralized-music-platform


2. *Install Backend Dependencies*
bash
cd backend
npm install


3. *Install Frontend Dependencies*
bash
cd ../frontend
npm install


4. *Build Smart Contract (Optional)*
bash
cd ../contracts
cargo build --release --target wasm32-unknown-unknown


5. *Environment Setup*

Create .env file in the backend directory:
env
PORT=5000
FRONTEND_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key_here


Create .env file in the frontend directory:
env
VITE_API_URL=http://localhost:5000/api


### Running the Application

1. *Start the Backend Server*
bash
cd backend
npm run dev

The backend will run on http://localhost:5000

2. *Start the Frontend Development Server*
bash
cd frontend
npm run dev

The frontend will run on http://localhost:5173

3. *Open in Browser*
Navigate to http://localhost:5173 and connect your MetaMask wallet.

## Deployed code at address: 0x5ceac6cc6fe538c322771eb3f7168401f3912a3e
## Deployment tx hash: 0x71e296acd02d8a602685bc9d6f64d70f088b5be912f9298ea5c6dba4c288d0c9
contract activated and ready onchain with tx hash: 0xc088848bcc8ef6ef3d874e9631d6ef00bce1e14d149527db81d1840649225bcd


## 📖 Usage Guide

### For Artists

1. *Connect Wallet*: Click "Connect Wallet" and select "Artist" role
2. *Upload Track*:
   - Navigate to "Upload Music"
   - Fill in track details (Title, Genre, Stream Cost)
   - Upload MP3 file
   - Optionally generate AI description
   - Click "Mint NFT & Publish"
3. *View Analytics*: Check your dashboard for streams and revenue
4. *Withdraw Earnings*: Click "Withdraw" to transfer earnings to your wallet

### For Listeners

1. *Connect Wallet*: Click "Connect Wallet" and select "Listener" role
2. *Deposit Funds*: Click "Deposit" to add ETH for streaming
3. *Browse Music*:
   - Home: View trending and all tracks
   - Search: Use AI to find music by mood/vibe
4. *Stream Music*: Click play on any track to start streaming
5. *Track Balance*: Monitor your balance in the header

## 🛠 Technology Stack

### Frontend
- *React* 18.2.0 - UI framework
- *Vite* - Build tool and dev server
- *ethers.js* 6.x - Ethereum library
- *axios* - HTTP client
- *lucide-react* - Icon library
- *Tailwind CSS* - Styling (via inline classes)

### Backend
- *Node.js* - Runtime environment
- *Express* - Web framework
- *multer* - File upload handling
- *cors* - Cross-origin resource sharing
- *dotenv* - Environment variables
- *Google Generative AI* - Gemini AI integration

### Smart Contract
- *Rust* 1.82.0 - Programming language
- *Arbitrum Stylus SDK* 0.9.0 - Smart contract framework
- *alloy-primitives* 0.8.20 - Ethereum primitive types

### Blockchain
- *Arbitrum Stylus* - Layer 2 blockchain platform
- *MetaMask* - Wallet provider
- *StreamFi Contract* - Custom Rust smart contract

## 📝 Smart Contract

The StreamFi smart contract is written in Rust using Arbitrum Stylus, providing efficient and secure on-chain operations.

### Contract Features

- *Counter Functionality*: Demonstrates basic state management
- *Payable Functions*: Accept ETH deposits
- *Arithmetic Operations*: Add, multiply, increment
- *Full Test Coverage*: Comprehensive unit tests

### Building the Contract

bash
cd contracts
cargo build --release --target wasm32-unknown-unknown


### Testing the Contract

bash
cd contracts
cargo test


### Exporting ABI

bash
cd contracts
cargo stylus export-abi


### Deploying the Contract

1. Install Arbitrum Stylus CLI tools
2. Deploy to Arbitrum Sepolia testnet:
bash
cargo stylus deploy --private-key <YOUR_PRIVATE_KEY>

3. Update contract address in frontend/src/hooks/useStreamFi.js

## 📡 API Endpoints

### Authentication
- POST /api/auth/connect - Connect wallet and create session
- POST /api/auth/deposit - Deposit funds
- POST /api/auth/withdraw - Withdraw earnings
- GET /api/auth/balance/:address - Get user balance

### Tracks
- GET /api/tracks - Get all tracks (with filters)
- GET /api/tracks/trending - Get trending tracks
- GET /api/tracks/:id - Get track by ID
- POST /api/tracks/upload - Upload new track (multipart/form-data)
- POST /api/tracks/:id/stream - Increment stream count

### Artists
- GET /api/artists/:address/stats - Get artist statistics
- GET /api/artists/:address/tracks - Get artist's tracks

### AI/Gemini
- POST /api/gemini/playlist - Generate AI playlist recommendations
- POST /api/gemini/description - Generate track description

### Streaming
- POST /api/stream/request - Request stream access

## 🔐 Security Features

- *Session Keys*: Cryptographic session keys for secure streaming
- *Signature Verification*: Request signing for payment verification
- *CORS Protection*: Configured CORS for frontend-backend communication
- *File Validation*: MP3-only uploads with size limits (50MB)
- *Wallet Authentication*: MetaMask-based authentication
- *Rust Smart Contract*: Memory-safe, high-performance contract execution

## 🎨 UI/UX Features

- *Dual Role System*: Separate interfaces for Artists and Listeners
- *Real-time Logs*: Protocol activity console for transparency
- *Responsive Design*: Works on desktop and mobile
- *Dark Theme*: Modern dark UI with emerald/orange accents
- *AI Integration*: Gemini AI for descriptions and recommendations
- *Player Component*: Bottom-fixed music player

## 🐛 Known Limitations

- *In-Memory Storage*: User data and tracks are stored in memory (resets on server restart)
- *Local File Storage*: MP3 files stored locally (not suitable for production)
- *Mock IPFS*: IPFS integration is simulated
- *No Database*: No persistent database (use MongoDB/PostgreSQL for production)
- *Development Only*: Not production-ready without additional security measures
- *Simple Contract*: Current contract is a demo; needs streaming-specific logic

## 🚧 Future Enhancements

- [ ] IPFS integration for decentralized file storage
- [ ] Persistent database (MongoDB/PostgreSQL)
- [ ] User profiles and avatars
- [ ] Playlist creation and management
- [ ] Social features (likes, comments, shares)
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-chain support
- [ ] Token rewards for listeners
- [ ] Decentralized governance
- [ ] Enhanced smart contract with streaming logic
- [ ] Batch payment settlement on-chain
- [ ] Gas optimization

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Google Gemini AI for AI-powered features
- MetaMask for wallet integration
- Arbitrum Stylus for efficient smart contract execution
- Ethereum community for blockchain infrastructure
- Rust community for excellent tooling
- Open source contributors

## 📞 Support

For support, email support@decentramusic.io or open an issue in the repository.

## 🔗 Links

- [Documentation](docs/)
- [Demo Video](link-to-demo)
- [Live Demo](link-to-live-demo)
- [Smart Contract Explorer](link-to-contract)
- [Arbitrum Stylus Docs](https://docs.arbitrum.io/stylus/stylus-gentle-introduction)

---

*Built with ❤ for the decentralized future of music*
