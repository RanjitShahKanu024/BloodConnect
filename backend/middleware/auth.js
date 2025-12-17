const jwt = require("jsonwebtoken");
const Donor = require("../models/Donor");

const auth = async (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    // 3. Fetch LATEST donor data from DB (to get updated 'role')
    const donor = await Donor.findById(decoded.id).select("-password");

    if (!donor) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    // 4. Attach the full donor object (with role) to the request
    req.donor = donor;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
