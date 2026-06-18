const express = require("express");
const router = express.Router();
const { downloadResume, getDownloadStats } = require("../controllers/resumeController");
const { protect } = require("../middleware/auth");

router.get("/download", downloadResume);
router.get("/stats", protect, getDownloadStats);

module.exports = router;
