const Contact = require("../models/Contact");
const { sendContactEmail } = require("../config/email");

// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Please provide a valid email address" });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip,
    });

    // Respond immediately once the message is safely saved — don't make the
    // user wait for two outgoing emails to finish. Email is sent in the
    // background; if it fails, the error is logged but the request has
    // already succeeded (message is safe in the DB either way).
    res.status(201).json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
      data: { id: contact._id },
    });

    sendContactEmail({ name, email, subject, message }).catch((emailError) => {
      console.error("⚠️  Email notification failed (message still saved to DB):", emailError.message);
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/contact
// @access  Private (admin only)
const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
};

// @route   PATCH /api/contact/:id/read
// @access  Private (admin only)
const markAsRead = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }
    res.json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/contact/:id
// @access  Private (admin only)
const deleteMessage = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }
    res.json({ success: true, message: "Message deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitContactForm, getAllMessages, markAsRead, deleteMessage };
