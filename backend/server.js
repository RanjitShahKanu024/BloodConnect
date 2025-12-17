// server.js (Updated for route modularity)

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
// const Donor = require("./models/Donor"); // No longer needed here
// const auth = require("./middleware/auth"); // No longer needed here

const donorRoutes = require("./routes/donorRoutes"); // <-- NEW IMPORT

dotenv.config();

// ------------------------
// MongoDB connection
// ------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ------------------------
// Initialize Express app
// ------------------------
const app = express();
app.use(express.json());
app.use(cors());

// ------------------------
// Root route
// ------------------------
app.get("/", (req, res) => {
  res.send("Blood Donation API is running");
});

// ------------------------
// Donor Routes (Modularized)
// ------------------------
app.use("/api/donors", donorRoutes); // <-- Use the imported router

// ------------------------
// Start Server
// ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
