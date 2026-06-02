const workerModel = require("../models/workermodel");
const { User } = require("../models/user");
const Request = require("../models/request");

const createWorkerProfile = async (req, res) => {
  const { category, experience, hourlyRate, location } = req.body;

  try {
    // if (!userId || !category || !experience || !hourlyRate || !location) {
    //   return res
    //     .status(400)
    //     .json({ message: "All fields are required", success: false });
    // }

    const Profile = new workerModel({
      userId: req.user.id, // Get userId from JWT token (set by verifyToken middleware)
      category,
      experience,
      hourlyRate,
      location,
    });
    await Profile.save();
    res.status(201).json({
      message: "Worker profile created successfully",
      success: true,
      Profile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

//catergory wise worker finding

const getWorkersBycategory = async (req, res) => {
  const rawCategory = req.query.category; // Get category from query parameters for GET request

  const normalizeCategory = (value) => {
    if (!value) return null;
    const v = value.toString().toLowerCase().trim();
    const map = {
      plumbing: "plumber",
      plumber: "plumber",
      electrical: "electrician",
      electrician: "electrician",
      carpentry: "carpenter",
      carpenter: "carpenter",
      painting: "painter",
      painter: "painter",
      mechanic: "mechanic",
      "ac repairing": "ac_repair",
      ac_repair: "ac_repair",
      "ac repair": "ac_repair",
    };

    return map[v] || v;
  };

  try {
    const category = normalizeCategory(rawCategory);
    const query = category ? { category } : {}; // If no category, get all workers
    const workers = await workerModel
      .find(query)
      .populate("userId", "name email contact");
    res.status(200).json({
      message: "Workers fetched successfully",
      success: true,
      workers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getcategoryCount = async (req, res) => {
  try {
    const Counts = await workerModel.aggregate([
      // MongoDB aggregation pipeline to count workers by category
      {
        $group: {
          // grouping the workers by category and counting the number of workers in each category
          _id: "$category",

          count: { $sum: 1 },
        },
      },
    ]);
    res.json(Counts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//checking workerprofile exist
const getWorkerProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const workerProfile = await workerModel
      .findOne({ userId })
      .populate("userId", "name email contact");

    if (!workerProfile) {
      return res.status(404).json({
        message: "Worker profile not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Worker profile fetched successfully",
      success: true,
      workerProfile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// Update worker profile
const updateWorkerProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category, experience, hourlyRate, location } = req.body;

    if (!category || !experience || !hourlyRate || !location) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const workerProfile = await workerModel
      .findOneAndUpdate(
        { userId },
        {
          category,
          experience,
          hourlyRate,
          location,
        },
        { new: true },
      )
      .populate("userId", "name email contact"); // Specifies paths which should be populated with other documents.

    if (!workerProfile) {
      return res.status(404).json({
        message: "Worker profile not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Worker profile updated successfully",
      success: true,
      workerProfile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const createRequest = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { workerId, message } = req.body;

    const workerProfile = await workerModel.findById(workerId);
    if (!workerProfile) {
      return res
        .status(404)
        .json({ message: "Worker not found", success: false });
    }

    const request = new Request({
      customerId,
      workerProfileId: workerProfile._id,
      message,
    });

    await request.save();

    res.status(201).json({
      success: true,
      message: "Booking request created",
      request,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
const getWorkerRequests = async (req, res) => {
  const workerProfile = await workerModel.findOne({ userId: req.user.id });
  if (!workerProfile)
    return res.status(404).json({ message: "No worker profile" });

  const requests = await Request.find({
    workerProfileId: workerProfile._id,
  }).populate("customerId", "name email contact");

  res.json({ success: true, requests });
};

const getCustomerBookings = async (req, res) => {
  const requests = await Request.find({
    customerId: req.user.id,
  }).populate({
    path: "workerProfileId",
    select: "category experience hourlyRate location userId",
    populate: {
      path: "userId",
      select: "name",
    },
  });

  res.json({ success: true, bookings: requests });
};

const updateRequestStatus = async (req, res) => {
  const { status } = req.body;
  const request = await Request.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true },
  );
  if (!request) return res.status(404).json({ message: "Request not found" });
  res.json({ success: true, request });
};

// Delete a request (for worker or admin)
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

module.exports = {
  createWorkerProfile,
  getWorkersBycategory,
  getcategoryCount,
  getWorkerProfile,
  updateWorkerProfile,
  createRequest,
  getWorkerRequests,
  getCustomerBookings,
  updateRequestStatus,
  deleteRequest,
};
