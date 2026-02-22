const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔗 Connect to MongoDB
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ☁️"))
    .catch(err => console.log(err));

// 📚 Admission Schema (UPDATED WITH STATUS)
const admissionSchema = new mongoose.Schema({
    studentName: String,
    dob: String,
    classApplying: String,
    parentName: String,
    phone: String,

    // 🆕 NEW FIELD (VERY IMPORTANT)
    status: {
        type: String,
        default: "Pending"
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const Admission = mongoose.model("Admission", admissionSchema);

// 📩 POST - Save Admission Form (NO CHANGE)
app.post("/api/admissions", async(req, res) => {
    try {
        const newAdmission = new Admission(req.body);
        await newAdmission.save();
        res.json({ message: "Application saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// 👀 GET - View All Applications (ADMIN USES THIS)
app.get("/api/admissions", async(req, res) => {
    try {
        const applications = await Admission.find().sort({ date: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: "Error fetching applications" });
    }
});

// 🆕 APPROVE APPLICATION (NEW ROUTE)
app.put("/api/admissions/approve/:id", async(req, res) => {
    try {
        await Admission.findByIdAndUpdate(req.params.id, {
            status: "Approved"
        });
        res.json({ message: "Application approved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Approval failed" });
    }
});

// ❌ DELETE Application (KEEPING YOUR ORIGINAL)
app.delete("/api/admissions/:id", async(req, res) => {
    try {
        await Admission.findByIdAndDelete(req.params.id);
        res.json({ message: "Application deleted" });
    } catch (error) {
        res.status(500).json({ error: "Delete failed" });
    }
});

// 🎓 STUDENT LOGIN (NEW)
app.post("/api/student/login", async(req, res) => {
    try {
        const { studentName, phone } = req.body;

        const student = await Admission.findOne({
            studentName,
            phone
        });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({
            message: "Login successful",
            student: student
        });

    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});