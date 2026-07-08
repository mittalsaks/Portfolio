const Profile = require("../models/Profile");

const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { _id: "singleton" },
      { $setOnInsert: { _id: "singleton" } },
      { new: true, upsert: true, setDefaultsOnInsert: true, lean: true } // 👈 add lean: true
    );
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      "singleton",
      { ...req.body, _id: "singleton" },
      { new: true, upsert: true, runValidators: true, lean: true } // 👈 add lean: true
    );
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile };