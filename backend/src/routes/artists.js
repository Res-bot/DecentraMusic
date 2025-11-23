const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

router.get('/:walletAddress/stats', artistController.getArtistStats);
router.get('/:walletAddress/tracks', artistController.getArtistTracks);

module.exports = router;