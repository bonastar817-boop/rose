const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const admissionRoutes = require("../Routes/admissionRoutes");

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ☁️"))
    .catch(err => console.log(err));

// Use Routes
app.use("/api", admissionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


const galleryRoutes = require("../Routes/galleryRoutes");

app.use("/api", galleryRoutes);

// Serve images publicly
app.use("/uploads", express.static("uploads"));