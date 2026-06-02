const express = require("express");
const {
  getAllUsers,
  getAllWorkers,
  getAllRequests,
  getDashboardStats,
  deleteUser,
  deleteRequest,
  updateUserRole,
} = require("../controllers/admincontroller");
const { verifyToken } = require("../middlewares/auth");
const { verifyAdmin } = require("../middlewares/adminAuth");

const router = express.Router();

// All admin routes require authentication and admin role
router.use(verifyToken, verifyAdmin);

// Dashboard
router.get("/dashboard/stats", getDashboardStats);

// Users management
router.get("/users", getAllUsers);
router.delete("/users/:userId", deleteUser);
router.put("/users/:userId/role", updateUserRole);

// Workers management
router.get("/workers", getAllWorkers);

// Requests management
router.get("/requests", getAllRequests);
router.delete("/requests/:requestId", deleteRequest);

module.exports = router;
