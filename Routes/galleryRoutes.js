const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const galleryController = require("../Controllerss/galleryController");

router.post("/gallery/upload", upload.single("image"), galleryController.uploadImage);
router.get("/gallery", galleryController.getImages);

module.exports = router;