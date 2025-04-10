const express = require('express');
const router = express.Router();
const multer = require('multer');
const protect = require('../middleware/authMiddleware');
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyForJob,
} = require('../controllers/jobController');

// Setup multer to store resume in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ⚠️ Important: Place this above the `/:id` route
router.post('/:id/apply', protect, upload.single('resume'), applyForJob);

// Job CRUD routes
router.route('/')
  .get(getJobs)
  .post(protect, createJob);

router.route('/:id')
  .get(getJobById)
  .put(protect, updateJob)
  .delete(protect, deleteJob);

module.exports = router;
