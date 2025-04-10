// routes/applicationRoutes.js
const express = require("express");
const router = express.Router();
const {
  applyToJob,
  getApplicationsForJob,
  getResumeFile,
} = require("../controllers/applicationController");
const protect = require("../middleware/authMiddleware");
const multer = require('multer');

// Use memory storage for resumes
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Apply to a job
router.post("/:jobId", protect, upload.single("resume"), applyToJob);

// Get all applicants for a job
router.get("/job/:jobId", protect, getApplicationsForJob);

// Download resume by ID
router.get("/resume/:resumeId", protect, getResumeFile);

module.exports = router;
