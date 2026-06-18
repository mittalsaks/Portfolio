const express = require("express");
const router = express.Router();
const {
  submitContactForm,
  getAllMessages,
  markAsRead,
  deleteMessage,
} = require("../controllers/contactController");
const { protect } = require("../middleware/auth");
const { contactValidationRules } = require("../middleware/validators");
const { contactLimiter } = require("../middleware/rateLimiter");

router.post("/", contactLimiter, contactValidationRules, submitContactForm);
router.get("/", protect, getAllMessages);
router.patch("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteMessage);

module.exports = router;
