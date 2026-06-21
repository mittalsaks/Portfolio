const express = require("express");
const router = express.Router();
const {
  login,
  verifyOtp,
  getMe,
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { loginValidationRules } = require("../middleware/validators");
const { loginLimiter } = require("../middleware/rateLimiter");

router.post("/login", loginLimiter, loginValidationRules, login);
// Reuses loginLimiter so OTP guesses get rate-limited too (6-digit OTP
// space is small enough that this matters — without it, the OTP could
// be brute-forced in a reasonable number of requests).
router.post("/verify-otp", loginLimiter, verifyOtp);
// Reuses loginLimiter to prevent brute-forcing reset tokens or spamming
// reset emails to an inbox.
router.post("/forgot-password", loginLimiter, forgotPassword);
router.post("/reset-password", loginLimiter, resetPassword);
router.get("/me", protect, getMe);
router.post("/logout", logout);
router.put("/change-password", protect, changePassword);

module.exports = router;