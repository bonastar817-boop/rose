const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
    imageUrl: String,
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Gallery", gallerySchema);