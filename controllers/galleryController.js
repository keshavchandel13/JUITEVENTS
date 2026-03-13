const { google } = require('googleapis');
const stream = require('stream');
const Gallery = require('../models/Gallery'); // Check this path matches your structure

// Initialize Google Auth
const KEYFILEPATH = './google-credentials.json'; 
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const auth = new google.auth.GoogleAuth({ keyFile: KEYFILEPATH, scopes: SCOPES });
const drive = google.drive({ version: 'v3', auth });

// >>> CRITICAL: PASTE YOUR FOLDER ID HERE <<<
const DRIVE_FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID'; 

const uploadEventImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ msg: "No image payload detected." });

        const { title, redirectUrl } = req.body;
        const bufferStream = new stream.PassThrough();
        bufferStream.end(req.file.buffer);

        // Transmit to Google Drive
        const response = await drive.files.create({
            requestBody: {
                name: `${Date.now()}_${req.file.originalname}`,
                parents: [DRIVE_FOLDER_ID],
            },
            media: {
                mimeType: req.file.mimetype,
                body: bufferStream,
            },
            fields: 'id',
        });

        const fileId = response.data.id;
        const driveUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

        // Log to MongoDB
        const newEntry = await Gallery.create({
            title,
            redirectUrl,
            driveUrl,
            driveFileId: fileId
        });

        return res.status(201).json({ msg: "Payload deployed.", data: newEntry });

    } catch (error) {
        console.error("Transmission Error:", error);
        return res.status(500).json({ msg: "Server malfunction during upload." });
    }
};

module.exports = { uploadEventImage };