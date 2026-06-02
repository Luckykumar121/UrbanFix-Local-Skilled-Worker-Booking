const mongoose = require("mongoose");

const workerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // Reference to the User model
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "plumber",
        "electrician",
        "carpenter",
        "painter",
        "mechanic",
        "ac_repair",
      ],
    },

    experience: {
      type: String,
      required: true,
    },

    hourlyRate: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      enum: [
        "Badhi",
        "Ranipur",
        "Ramgarh",
        "Roshanpur",
        "Aghyana",
        "Dholamajara",
        "Tighri",
        "Naharmajara",
      ],
      required: true,
    },
  },
  { timestamps: true },
);

const workerModel = mongoose.model("WorkerProfile", workerProfileSchema);
module.exports = workerModel;
