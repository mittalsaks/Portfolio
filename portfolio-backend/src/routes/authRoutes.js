const express = require("express");
const router = express.Router();
const { login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { loginValidationRules } = require("../middleware/validators");
const { loginLimiter } = require("../middleware/rateLimiter");

router.post("/login", loginLimiter, loginValidationRules, login);
router.get("/me", protect, getMe);

module.exports = router;
