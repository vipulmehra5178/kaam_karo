// controllers/applicationController.js
const Job = require('../models/Job');
const mongoose = require('mongoose');

// POST /api/applications/:jobId
const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const application = {
      user: userId,
      filename: resumeFile.originalname,
      contentType: resumeFile.mimetype,
      data: resumeFile.buffer,
    };

    job.applicants.push(application);
    await job.save();

    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/applications/job/:jobId
const getApplicationsForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).populate('applicants.user', 'name email');
    if (!job) return res.status(404).json({ message: "Job not found" });

    res.status(200).json({ applicants: job.applicants });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/applications/resume/:resumeId
const getResumeFile = async (req, res) => {
  try {
    const job = await Job.findOne({ 'applicants._id': req.params.resumeId });

    if (!job) return res.status(404).json({ message: "Resume not found" });

    const applicant = job.applicants.id(req.params.resumeId);
    res.set('Content-Type', applicant.contentType);
    res.set('Content-Disposition', `attachment; filename="${applicant.filename}"`);
    res.send(applicant.data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  applyToJob,
  getApplicationsForJob,
  getResumeFile,
};
