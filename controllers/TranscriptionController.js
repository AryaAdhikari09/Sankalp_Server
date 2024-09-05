const axios = require('axios');
const path = require('path');
const fs = require('fs');

const transcribeAudio = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);

        // Create form data to send to Python server
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));

        // const response = await axios.post('http://localhost:5001/transcribe', formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        // });

        const response = await axios.post('http://127.0.0.1:5001/transcribe', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Optionally remove the uploaded file
        fs.unlinkSync(filePath);

        res.json({ transcription: response.data.transcription });
    } catch (error) {
        console.error('Error during transcription:', error);
        res.status(500).json({ error: 'Error during transcription' });
    }
};

module.exports = { transcribeAudio };
