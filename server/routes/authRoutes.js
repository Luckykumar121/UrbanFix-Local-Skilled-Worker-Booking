const express = require("express");
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/validation");
const {
  signup,
  login,
  getProfile,
  updateProfile,
  changePassword,
  verifyEmail,
} = require("../controllers/authcontroller");
const { verifyToken } = require("../middlewares/auth");
const router = express.Router();

//routers

router.post("/register", signupValidation, signup); //middlewares of signupvalidation and signup authcontroller has been added

router.post("/login", loginValidation, login); //middlewares of loginvalidation and login authcontroller has been added

router.get("/profile", verifyToken, getProfile); //get user profile

router.put("/update-profile", verifyToken, updateProfile); //update user profile

router.post("/change-password", verifyToken, changePassword); //change password
router.post("/verify-email", verifyEmail); //verify email

module.exports = router;
