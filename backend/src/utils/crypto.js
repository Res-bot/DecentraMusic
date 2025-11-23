const nacl = require('tweetnacl');
const { Buffer } = require('buffer');

const generateSessionKeys = () => {
  const randomString = Math.random().toString(36).substring(2, 15);
  return {
    publicKey: `ed25519_pub_${randomString}`,
    privateKey: `ed25519_priv_${randomString}`,
  };
};

const verifySignature = (message, signatureHex, publicKeyStr) => {
  try {
    // Mock bypass for demo keys
    if (publicKeyStr.startsWith('ed25519_pub_')) {
      return true;
    }

    const messageBytes = new TextEncoder().encode(message);
    const signatureBytes = new Uint8Array(Buffer.from(signatureHex.replace('0x', ''), 'hex'));
    const publicKeyBytes = new Uint8Array(Buffer.from(publicKeyStr.replace('0x', ''), 'hex'));

    return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
  } catch (e) {
    console.error('Crypto verification failed:', e);
    return false;
  }
};

module.exports = { generateSessionKeys, verifySignature };