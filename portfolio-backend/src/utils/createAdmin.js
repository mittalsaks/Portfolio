// Run with: npm run create-admin
// Creates (or updates) the admin account using ADMIN_EMAIL / ADMIN_PASSWORD from .env

require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.error("❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
      process.exit(1);
    }

    let admin = await Admin.findOne({ email: email.toLowerCase() });

    if (admin) {
      admin.password = password; // will be re-hashed by pre-save hook
      await admin.save();
      console.log(`✅ Existing admin updated: ${email}`);
    } else {
      admin = await Admin.create({ email, password, name: "Admin" });
      console.log(`✅ Admin created: ${email}`);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

run();
