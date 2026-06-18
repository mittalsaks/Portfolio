const Profile = require("../models/Profile");

// @route   GET /api/profile
// @access  Public
const getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findById("singleton");
    if (!profile) {
      // Auto-create with placeholder defaults on first run so the endpoint
      // never 404s — the frontend always gets something to render.
      profile = await Profile.create({ _id: "singleton" });
    }
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/profile
// @access  Private (admin only)
const updateProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      "singleton",
      { ...req.body, _id: "singleton" },
      { new: true, upsert: true, runValidators: true }
    );
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile };
