const User = require("../models/user");
const Request = require("../models/request");
const workerModel = require("../models/workermodel");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); //
    res.status(200).json({
      message: "All users retrieved successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      success: false,
      error: error.message,
    });
  }
};

// Get all workers
const getAllWorkers = async (req, res) => {
  try {
    const workers = await User.find({ role: "worker" }).select("-password");
    res.status(200).json({
      message: "All workers retrieved successfully",
      success: true,
      data: workers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching workers",
      success: false,
      error: error.message,
    });
  }
};

// Get all bookings/requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("customerId", "name email")
      .populate("workerProfileId", "name email")
      .lean();
    res.status(200).json({
      message: "All requests retrieved successfully",
      success: true,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching requests",
      success: false,
      error: error.message,
    });
  }
};

// Get dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalWorkers = await User.countDocuments({ role: "worker" });
    const totalRequests = await Request.countDocuments();
    const completedRequests = await Request.countDocuments({
      status: "completed",
    });

    res.status(200).json({
      message: "Dashboard stats retrieved successfully",
      success: true,
      data: {
        totalUsers,
        totalWorkers,
        totalRequests,
        completedRequests,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching dashboard stats",
      success: false,
      error: error.message,
    });
  }
};

// Delete user with cascade delete of associated worker profiles and requests
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Delete all worker profiles for this user
    const workerProfiles = await workerModel.find({ userId });
    for (const profile of workerProfiles) {
      await Request.deleteMany({ workerProfileId: profile._id });
    }
    await workerModel.deleteMany({ userId });

    // Delete the user
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      success: false,
      error: error.message,
    });
  }
};

// Delete a specific request
const deleteRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findByIdAndDelete(requestId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Request deleted successfully",
      success: true,
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting request",
      success: false,
      error: error.message,
    });
  }
};

// Update user role
const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["customer", "worker"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
        success: false,
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "User role updated successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user role",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getAllWorkers,
  getAllRequests,
  getDashboardStats,
  deleteUser,
  deleteRequest,
  updateUserRole,
};
