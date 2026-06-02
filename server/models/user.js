const mongoose = require("mongoose");

//create schemas for login and signup

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 5, maxlength: 100 },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    contact: { type: String, required: true, minlength: 10, maxlength: 10 },
    password: { type: String, required: true, minlength: 4, maxlength: 200 },
    role: {
      type: String,
      required: true,
      enum: ["customer", "worker", "admin"],
      default: "customer",
    },
    isverified: { type: Boolean, default: false },
    verificationCode: { type: String },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
