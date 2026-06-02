const express = require("express");
const { workerProfileValidation } = require("../middlewares/validation");
const { verifyToken } = require("../middlewares/auth");
const {
  createWorkerProfile,
  getWorkersBycategory,
  getcategoryCount,
  getWorkerProfile,
  updateWorkerProfile,
  getWorkerRequests,
  createRequest,
  getCustomerBookings,
  updateRequestStatus,
  deleteRequest,
} = require("../controllers/workercontroller");
const router = express.Router();

//routers

router.post(
  "/profile",
  verifyToken,
  workerProfileValidation,
  createWorkerProfile,
); //creating worker profile (requires auth)

router.get("/list", getWorkersBycategory); //get worker by category
router.get("/category-count", getcategoryCount); //get worker count by category
router.get("/my-profile", verifyToken, getWorkerProfile); //get authenticated worker profile
router.put("/update-profile", verifyToken, updateWorkerProfile); //update worker profile

router.post("/requests", verifyToken, createRequest); // Create booking request (requires auth)
router.get("/requests", verifyToken, getWorkerRequests); // Get requests for authenticated worker
router.put("/requests/:id", verifyToken, updateRequestStatus); // Update request status (accept/reject)
router.delete("/requests/:requestId", verifyToken, deleteRequest); // Delete a request
router.get("/bookings", verifyToken, getCustomerBookings); // Get bookings for authenticated customer
module.exports = router;
