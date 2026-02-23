const Admission = require("../Models/Admissions");

// Save Admission
exports.createAdmission = async(req, res) => {
    try {
        const newAdmission = new Admission(req.body);
        await newAdmission.save();
        res.json({ message: "Application saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get All Admissions
exports.getAdmissions = async(req, res) => {
    try {
        const applications = await Admission.find().sort({ date: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: "Error fetching applications" });
    }
};

// Approve Admission
exports.approveAdmission = async(req, res) => {
    try {
        await Admission.findByIdAndUpdate(req.params.id, {
            status: "Approved"
        });
        res.json({ message: "Application approved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Approval failed" });
    }
};

// Delete Admission
exports.deleteAdmission = async(req, res) => {
    try {
        await Admission.findByIdAndDelete(req.params.id);
        res.json({ message: "Application deleted" });
    } catch (error) {
        res.status(500).json({ error: "Delete failed" });
    }
};

// Student Login
exports.studentLogin = async(req, res) => {
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
            student
        });

    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};