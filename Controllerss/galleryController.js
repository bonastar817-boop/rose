const Gallery = require("../Models/Gallery.js");

// Upload Image
exports.uploadImage = async(req, res) => {
    try {
        const newImage = new Gallery({
            imageUrl: req.file.filename
        });

        await newImage.save();

        res.json({ message: "Image uploaded successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Upload failed" });
    }
};

// Get All Images
exports.getImages = async(req, res) => {
    try {
        const images = await Gallery.find().sort({ uploadedAt: -1 });
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: "Fetching images failed" });
    }
};