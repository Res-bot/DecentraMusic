const { users } = require('../models/User');

/**
 * Middleware to verify wallet authentication
 * Checks if the wallet address in request is registered
 */
const authenticateWallet = (req, res, next) => {
  try {
    const walletAddress = req.headers['x-wallet-address'] || req.body.walletAddress;

    if (!walletAddress) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'Wallet address not provided' 
      });
    }

    const user = users.get(walletAddress.toLowerCase());

    if (!user) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'Wallet not registered. Please connect wallet first.' 
      });
    }

    // Attach user to request object for use in controllers
    req.user = user;
    req.walletAddress = walletAddress.toLowerCase();
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
};

/**
 * Middleware to verify artist role
 * Must be used after authenticateWallet
 */
const authenticateArtist = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Unauthorized',
      message: 'User not authenticated' 
    });
  }

  if (req.user.role !== 'artist') {
    return res.status(403).json({ 
      error: 'Forbidden',
      message: 'This action requires artist privileges' 
    });
  }

  next();
};

/**
 * Middleware to verify listener role
 * Must be used after authenticateWallet
 */
const authenticateListener = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Unauthorized',
      message: 'User not authenticated' 
    });
  }

  if (req.user.role !== 'listener') {
    return res.status(403).json({ 
      error: 'Forbidden',
      message: 'This action requires listener privileges' 
    });
  }

  next();
};

/**
 * Optional authentication - doesn't fail if user is not authenticated
 * Just attaches user to request if wallet address is provided
 */
const optionalAuth = (req, res, next) => {
  try {
    const walletAddress = req.headers['x-wallet-address'] || req.body.walletAddress;

    if (walletAddress) {
      const user = users.get(walletAddress.toLowerCase());
      if (user) {
        req.user = user;
        req.walletAddress = walletAddress.toLowerCase();
      }
    }
    
    next();
  } catch (error) {
    console.error('Optional auth error:', error);
    next(); // Continue anyway
  }
};

/**
 * Middleware to check if user has sufficient balance
 * Used for operations that require payment
 */
const checkBalance = (requiredAmount) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'User not authenticated' 
      });
    }

    if (req.user.balance < requiredAmount) {
      return res.status(402).json({ 
        error: 'Insufficient Balance',
        message: `Required: ${requiredAmount} ETH, Available: ${req.user.balance} ETH`,
        required: requiredAmount,
        available: req.user.balance
      });
    }

    next();
  };
};

/**
 * Rate limiting middleware (simple implementation)
 * Prevents abuse by limiting requests per wallet
 */
const rateLimitByWallet = () => {
  const requestCounts = new Map();
  const WINDOW_MS = 60000; // 1 minute
  const MAX_REQUESTS = 100; // 100 requests per minute

  return (req, res, next) => {
    const walletAddress = req.walletAddress || req.headers['x-wallet-address'];
    
    if (!walletAddress) {
      return next(); // Skip if no wallet
    }

    const now = Date.now();
    const userKey = walletAddress.toLowerCase();
    
    if (!requestCounts.has(userKey)) {
      requestCounts.set(userKey, { count: 1, resetTime: now + WINDOW_MS });
      return next();
    }

    const userData = requestCounts.get(userKey);

    if (now > userData.resetTime) {
      // Reset window
      requestCounts.set(userKey, { count: 1, resetTime: now + WINDOW_MS });
      return next();
    }

    if (userData.count >= MAX_REQUESTS) {
      return res.status(429).json({ 
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: Math.ceil((userData.resetTime - now) / 1000)
      });
    }

    userData.count++;
    next();
  };
};

module.exports = {
  authenticateWallet,
  authenticateArtist,
  authenticateListener,
  optionalAuth,
  checkBalance,
  rateLimitByWallet
};