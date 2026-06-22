const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Admin = require("../models/Admin");
const { sendOtpEmail, sendPasswordResetEmail } = require("../utils/email");

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const RESET_TOKEN_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// Issues the real JWT + sets the cookie — shared by both the (now retired)
// direct-login path and the new verify-otp success path.
const issueSession = (res, admin) => {
  const token = generateToken(admin._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

// @route   POST /api/auth/login
// @access  Public
// Step 1 of 2: verify email+password, then email a 6-digit OTP instead of
// logging in directly. No token is issued here anymore.
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate a 6-digit OTP, hash it before storing (never store plain text)
    const otp = crypto.randomInt(100000, 1000000).toString();
    const salt = await bcrypt.genSalt(10);
    admin.otpHash = await bcrypt.hash(otp, salt);
    admin.otpExpiresAt = new Date(Date.now() + OTP_EXPIRY_MS);
    await admin.save();

    try {
      await sendOtpEmail(admin.email, otp);
    } catch (emailError) {
      // If the email genuinely can't be sent, don't leave the admin stuck —
      // surface a clear error instead of a silent dead end.
      console.error("⚠️  Failed to send OTP email:", emailError.message);
      return res.status(500).json({
        success: false,
        message: "Could not send verification code. Please try again in a moment.",
      });
    }

    res.json({
      success: true,
      otpRequired: true,
      message: "Verification code sent to your email.",
    });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/auth/verify-otp
// @access  Public (but requires the correct email + a valid, unexpired OTP)
// Step 2 of 2: checks the submitted OTP, and if valid, issues the real JWT
// the same way the old direct-login path used to.
const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and code are required" });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !admin.otpHash || !admin.otpExpiresAt) {
      return res.status(401).json({ success: false, message: "No pending verification for this email" });
    }

    if (admin.otpExpiresAt.getTime() < Date.now()) {
      admin.otpHash = null;
      admin.otpExpiresAt = null;
      await admin.save();
      return res.status(401).json({ success: false, message: "Code expired. Please log in again." });
    }

    const isMatch = await bcrypt.compare(otp, admin.otpHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect code" });
    }

    // OTP is valid and single-use — clear it immediately so it can't be replayed
    admin.otpHash = null;
    admin.otpExpiresAt = null;
    await admin.save();

    const token = issueSession(res, admin);

    res.json({
      success: true,
      token,
      admin: { id: admin._id, email: admin.email, name: admin.name },
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    res.json({ success: true, admin: req.admin });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res, next) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.json({ success: true, message: "Logged out" });
};

// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long",
      });
    }

    const admin = await Admin.findById(req.admin._id || req.admin.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }

    admin.password = newPassword;
    await admin.save(); // relies on a pre-save hook in Admin.js to hash this

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/auth/forgot-password
// @access  Public
// Generates a one-time reset token, emails a reset link. Always responds
// with the same generic message regardless of whether the email exists,
// so no one can use this endpoint to discover the admin's email address.
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const genericResponse = {
      success: true,
      message: "If that email is registered, a reset link has been sent.",
    };

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      // Don't reveal whether the email exists — same response either way.
      return res.json(genericResponse);
    }

    // Raw token goes in the email link; only its hash is stored in the DB,
    // same pattern as the OTP — so a DB leak alone can't be used to reset
    // the password.
    const rawToken = crypto.randomBytes(32).toString("hex");
    const salt = await bcrypt.genSalt(10);
    admin.resetTokenHash = await bcrypt.hash(rawToken, salt);
    admin.resetTokenExpiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRY_MS);
    await admin.save();

    const resetUrl = `${process.env.FRONTEND_URL}/admin/reset-password?token=${rawToken}&email=${encodeURIComponent(admin.email)}`;

    try {
      await sendPasswordResetEmail(admin.email, resetUrl);
    } catch (emailError) {
      console.error("⚠️  Failed to send password reset email:", emailError.message);
      // Still return the generic response — don't leak whether the email
      // step succeeded, and don't leave the admin in a half-reset state
      // (the token is already saved, so a retry will just overwrite it).
    }

    res.json(genericResponse);
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/auth/reset-password
// @access  Public (but requires a valid, unexpired token tied to the email)
const resetPassword = async (req, res, next) => {
  try {
    const { email, token, newPassword } = req.body;

    if (!email || !token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, token, and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long",
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !admin.resetTokenHash || !admin.resetTokenExpiresAt) {
      return res.status(401).json({ success: false, message: "Invalid or expired reset link" });
    }

    if (admin.resetTokenExpiresAt.getTime() < Date.now()) {
      admin.resetTokenHash = null;
      admin.resetTokenExpiresAt = null;
      await admin.save();
      return res.status(401).json({ success: false, message: "Reset link has expired. Please request a new one." });
    }

    const isMatch = await bcrypt.compare(token, admin.resetTokenHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid or expired reset link" });
    }

    // Token is valid and single-use — clear it, then set the new password
    // (the pre-save hook in Admin.js hashes it automatically).
    admin.resetTokenHash = null;
    admin.resetTokenExpiresAt = null;
    admin.password = newPassword;
    await admin.save();

    res.json({ success: true, message: "Password reset successfully. You can now log in." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  verifyOtp,
  getMe,
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
};