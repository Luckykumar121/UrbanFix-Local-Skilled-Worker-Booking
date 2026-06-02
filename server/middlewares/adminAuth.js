const verifyAdmin = (req, res, next) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized. Please login first.",
        success: false,
      });
    }

    // Check if user has admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
        success: false,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error verifying admin privileges",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { verifyAdmin };
