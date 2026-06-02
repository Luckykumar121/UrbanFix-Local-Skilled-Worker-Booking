const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workerProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkerProfile",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
    message: {
      type: String,
    },
  },
  { timestamps: true },
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
