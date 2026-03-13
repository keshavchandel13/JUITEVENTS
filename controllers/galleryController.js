const Gallery = require('../models/Gallery');

// 1. Add Image Link to DB
const addEventImage = async (req, res) => {
    try {
        const { title, redirectUrl, imageUrl } = req.body;
        
        if (!title || !imageUrl) {
            return res.status(400).json({ msg: "Title and Image URL are required." });
        }

        const newEntry = await Gallery.create({ title, redirectUrl, imageUrl });
        return res.status(201).json({ msg: "Visual payload logged to database.", data: newEntry });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Database malfunction." });
    }
};

// 2. Fetch all images for the frontend
const getGalleryImages = async (req, res) => {
    try {
        const images = await Gallery.find().sort({ uploadedAt: -1 }); // Newest first
        return res.status(200).json({ images });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Failed to fetch gallery data." });
    }
};

module.exports = { addEventImage, getGalleryImages };