const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
    studentName: String,
    dob: String,
    classApplying: String,
    parentName: String,
    phone: String,

    status: {
        type: String,
        default: "Pending"
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Admission", admissionSchema);