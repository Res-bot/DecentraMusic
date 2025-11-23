const express = require('express');
const router = express.Router();
const streamController = require('../controllers/streamController');
const { paymentGatekeeper } = require('../middleware/x402');

router.get('/:songId', paymentGatekeeper, streamController.requestStream);

module.exports = router;