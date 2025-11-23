const { User, users } = require('../models/User');
const { generateSessionKeys } = require('../utils/crypto');

exports.connectWallet = async (req, res) => {
  try {
    const { walletAddress, role } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    // Check if user exists
    let user = users.get(walletAddress.toLowerCase());

    if (!user) {
      // Create new user
      const keys = generateSessionKeys();
      user = new User({
        walletAddress: walletAddress.toLowerCase(),
        sessionPublicKey: keys.publicKey,
        sessionPrivateKey: keys.privateKey,
        role: role || 'listener',
        balance: role === 'artist' ? 4.25 : 0
      });
      users.set(walletAddress.toLowerCase(), user);
    }

    res.json({
      success: true,
      user: {
        walletAddress: user.walletAddress,
        sessionPublicKey: user.sessionPublicKey,
        sessionPrivateKey: user.sessionPrivateKey,
        balance: user.balance,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Connect wallet error:', error);
    res.status(500).json({ error: 'Failed to connect wallet' });
  }
};

exports.registerSession = async (req, res) => {
  try {
    const { walletAddress, sessionPublicKey } = req.body;

    if (!walletAddress || !sessionPublicKey) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = users.get(walletAddress.toLowerCase());
    if (user) {
      user.sessionPublicKey = sessionPublicKey;
    }

    res.json({ success: true, message: 'Session registered' });
  } catch (error) {
    console.error('Register session error:', error);
    res.status(500).json({ error: 'Failed to register session' });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const user = users.get(walletAddress.toLowerCase());

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ balance: user.balance });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ error: 'Failed to get balance' });
  }
};

exports.deposit = async (req, res) => {
  try {
    const { walletAddress, amount } = req.body;
    const user = users.get(walletAddress.toLowerCase());

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.balance += parseFloat(amount);

    res.json({
      success: true,
      newBalance: user.balance,
      message: 'Deposit successful'
    });
  } catch (error) {
    console.error('Deposit error:', error);
    res.status(500).json({ error: 'Failed to process deposit' });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const user = users.get(walletAddress.toLowerCase());

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const withdrawAmount = user.balance;
    user.balance = 0;

    res.json({
      success: true,
      amount: withdrawAmount,
      message: 'Withdrawal successful'
    });
  } catch (error) {
    console.error('Withdraw error:', error);
    res.status(500).json({ error: 'Failed to process withdrawal' });
  }
};