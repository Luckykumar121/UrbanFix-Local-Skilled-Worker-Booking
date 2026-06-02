const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer token"

    if (!token) {
      return res.status(401).json({
        message: "No token provided. Please login first.",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store decoded token data in req.user
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired. Please login again.",
        success: false,
      });
    }
    return res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }
};

module.exports = { verifyToken };
