const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'audio/mpeg' || file.originalname.endsWith('.mp3')) {
            cb(null, true);
        } else {
            cb(new Error('Only MP3 files are allowed'));
        }
    },
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

router.get('/', trackController.getAllTracks);
router.get('/trending', trackController.getTrendingTracks);
router.get('/:id', trackController.getTrackById);
router.post('/upload', upload.single('audioFile'), trackController.uploadTrack);
router.post('/:id/stream', trackController.incrementStream);

module.exports = router;