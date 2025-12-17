// routes/donorRoutes.js (FULL CODE - Updated with Admin and Profile Management)

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import Model and Middleware
const Donor = require("../models/Donor");
const auth = require("../middleware/auth");

/**
 * ADMIN MIDDLEWARE
 * Checks if the authenticated user has an 'admin' role
 */
const isAdmin = (req, res, next) => {
  if (req.donor && req.donor.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin resources only." });
  }
};

// --- PUBLIC ROUTES ---

// @route   POST /api/donors/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, bloodGroup, city, phone } = req.body;

    let donor = await Donor.findOne({ email });
    if (donor) return res.status(400).json({ message: "Donor already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    donor = new Donor({
      name,
      email,
      password: hashedPassword,
      bloodGroup: bloodGroup.toUpperCase(),
      city,
      phone,
    });

    await donor.save();

    const token = jwt.sign(
      { id: donor._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.status(201).json({
      token,
      donor: donor.toObject({ getters: true, virtuals: true }),
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ error: err.message || "Registration failed" });
  }
});

// @route   POST /api/donors/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const donor = await Donor.findOne({ email });
    if (!donor) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: donor._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      donor: donor.toObject({ getters: true, virtuals: true }),
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// @route   GET /api/donors/search
router.get("/search", async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;
    let query = { status: "available" };

    if (bloodGroup) query.bloodGroup = bloodGroup.toUpperCase();
    if (city) query.city = { $regex: city, $options: "i" };

    const donors = await Donor.find(query).select("-password -email -__v");
    res.status(200).json(donors);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});

// --- PRIVATE USER ROUTES ---

// @route   GET /api/donors/profile
router.get("/profile", auth, (req, res) => {
  res.status(200).json(req.donor);
});

// @route   PUT /api/donors/profile (Update Profile Info)
router.put("/profile", auth, async (req, res) => {
  try {
    const updates = req.body;
    if (updates.bloodGroup)
      updates.bloodGroup = updates.bloodGroup.toUpperCase();

    const donor = await Donor.findByIdAndUpdate(
      req.donor._id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    res.status(200).json(donor);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// @route   PUT /api/donors/availability (Toggle availability)
router.put("/availability", auth, async (req, res) => {
  try {
    const { isAvailable } = req.body;
    // Map isAvailable to the 'status' field used in your search
    const newStatus = isAvailable ? "available" : "unavailable";

    const donor = await Donor.findByIdAndUpdate(
      req.donor._id,
      { $set: { status: newStatus, isAvailable: isAvailable } },
      { new: true }
    ).select("-password");

    res.status(200).json(donor);
  } catch (err) {
    res.status(500).json({ error: "Availability update failed" });
  }
});

// --- ADMIN CONTROL ROUTES ---

// @route   GET /api/donors/admin/all
router.get("/admin/all", auth, isAdmin, async (req, res) => {
  try {
    const donors = await Donor.find({})
      .select("-password")
      .sort({ createdAt: -1 });
    res.status(200).json(donors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching donor list" });
  }
});

// @route   DELETE /api/donors/admin/:id
router.delete("/admin/:id", auth, isAdmin, async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Donor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete donor" });
  }
});

// @route   PUT /api/donors/admin/verify/:id
router.put("/admin/verify/:id", auth, isAdmin, async (req, res) => {
  try {
    const { isVerified } = req.body;
    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      { $set: { isVerified: isVerified } },
      { new: true }
    ).select("-password");

    res.status(200).json(donor);
  } catch (err) {
    res.status(500).json({ message: "Failed to update verification status" });
  }
});

module.exports = router;
