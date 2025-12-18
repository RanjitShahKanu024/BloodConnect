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

// IMPORTANT: CORS configuration must come BEFORE express.json()
// Allow your specific frontend domains
const allowedOrigins = [
  "http://localhost:3000",
  "https://blood-connect-git-main-ranjitshahkanu024s-projects.vercel.app",
  "https://blood-connect-psi.vercel.app",
  "https://blood-connect-tuev.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified origin: " +
          origin;
        console.warn("CORS blocked for origin:", origin);
        return callback(new Error(msg), false);
      }

      console.log("CORS allowed for origin:", origin);
      return callback(null, true);
    },
    credentials: true, // Allow cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all necessary methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
  })
);

app.use(express.json());

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
