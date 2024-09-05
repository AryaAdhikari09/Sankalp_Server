const express = require('express');
const multer = require('multer');
const { transcribeAudio } = require('../controllers/TranscriptionController');

const router = express.Router();

// Multer configuration for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Route for transcription
router.post('/transcribe', upload.single('file'), transcribeAudio);

module.exports = router;
