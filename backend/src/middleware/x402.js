const { verifySignature } = require('../utils/crypto');
const { users } = require('../models/User');

const usedNonces = new Set();

const paymentGatekeeper = async (req, res, next) => {
  const songId = req.params.songId;
  const authHeader = req.headers['authorization'];

  // STEP 1: Check for Authorization Header
  if (!authHeader || !authHeader.startsWith('x402 ')) {
    const nonce = Date.now().toString();
    const messageToSign = `STREAM:${songId}:${nonce}`;
    
    return res.status(402).json({
      error: 'Payment Required',
      details: {
        price: '0.0001 ETH',
        gateway: 'StreamFi Arbitrum Gateway',
        messageToSign: messageToSign,
        scheme: 'x402 <WalletAddress>:<Signature>:<Message>'
      }
    });
  }

  // STEP 2: Parse Header
  try {
    const parts = authHeader.replace('x402 ', '').split(':');
    if (parts.length < 3) throw new Error('Invalid Header Format');

    const [walletAddress, signature, ...msgParts] = parts;
    const message = msgParts.join(':');

    // STEP 3: Replay Protection
    if (usedNonces.has(signature)) {
      return res.status(403).json({ error: 'Replay Detected' });
    }
    usedNonces.add(signature);

    // STEP 4: Retrieve Session Key
    const user = users.get(walletAddress.toLowerCase());
    if (!user) {
      return res.status(403).json({ error: 'No active session found for wallet' });
    }

    // STEP 5: Verify Signature
    const isValid = verifySignature(message, signature, user.sessionPublicKey);

    if (!isValid) {
      return res.status(403).json({ error: 'Invalid Signature' });
    }

    console.log(`[x402] Authorized stream for ${walletAddress}`);
    req.user = user;
    next();

  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: 'Bad Request' });
  }
};

module.exports = { paymentGatekeeper };