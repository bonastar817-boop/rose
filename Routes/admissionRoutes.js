const express = require("express");
const router = express.Router();
const admissionController = require("../controllers/admissionController");

router.post("/admissions", admissionController.createAdmission);
router.get("/admissions", admissionController.getAdmissions);
router.put("/admissions/approve/:id", admissionController.approveAdmission);
router.delete("/admissions/:id", admissionController.deleteAdmission);
router.post("/student/login", admissionController.studentLogin);

module.exports = router;