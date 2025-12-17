// models/Donor.js (FULL CODE - Refactored with Validators & Admin Fields)

const mongoose = require("mongoose");

// Array of valid blood groups for the 'enum' validator
const VALID_BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const donorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood Group is required"],
      trim: true,
      uppercase: true,
      enum: {
        values: VALID_BLOOD_GROUPS,
        message:
          "Invalid blood group. Must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-.",
      },
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      minlength: [10, "Phone number must be at least 10 digits"],
    },
    status: {
      type: String,
      enum: ["available", "unavailable", "blocked"],
      default: "available",
    },
    // --- ADMIN & CONTROL FIELDS ---
    role: {
      type: String,
      enum: ["donor", "admin"],
      default: "donor",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    // Optional field to track the last time a donor donated
    lastDonationDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donor", donorSchema);
