const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔗 Connect to MongoDB (Change if needed)
require("dotenv").config();


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ☁️"))
    .catch(err => console.log(err));

// 📚 Admission Schema
const admissionSchema = new mongoose.Schema({
    studentName: String,
    dob: String,
    classApplying: String,
    parentName: String,
    phone: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Admission = mongoose.model("Admission", admissionSchema);

// 📩 POST - Save Admission Form
app.post("/api/admissions", async(req, res) => {
    try {
        const newAdmission = new Admission(req.body);
        await newAdmission.save();
        res.json({ message: "Application saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// 👀 GET - View All Applications (For Admin Dashboard later)
app.get("/api/admissions", async(req, res) => {
    try {
        const applications = await Admission.find().sort({ date: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: "Error fetching applications" });
    }

});

// ❌ DELETE Application
app.delete("/api/admissions/:id", async(req, res) => {
    try {
        await Admission.findByIdAndDelete(req.params.id);
        res.json({ message: "Application deleted" });
    } catch (error) {
        res.status(500).json({ error: "Delete failed" });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});