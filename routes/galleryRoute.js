const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadEventImage } = require('../controllers/galleryController');
// const { authMiddleware } = require('../middleware/auth'); // Uncomment if you have JWT middleware

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Add authMiddleware before upload.single if restricting to admins
router.post('/upload', upload.single('image'), uploadEventImage);

module.exports = router;