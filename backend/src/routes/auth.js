const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/connect', authController.connectWallet);
router.post('/register-session', authController.registerSession);
router.get('/balance/:walletAddress', authController.getBalance);
router.post('/deposit', authController.deposit);
router.post('/withdraw', authController.withdraw);

module.exports = router;