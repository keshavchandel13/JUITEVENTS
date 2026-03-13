const express = require('express');
const router = express.Router();
const { addEventImage, getGalleryImages } = require('../controllers/galleryController');
// const { authMiddleware } = require('../middleware/auth'); // If you are restricting POSTs

router.get('/', getGalleryImages);
router.post('/add', addEventImage); // Add authMiddleware here if needed

module.exports = router;