const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // For password hashing
const { Sendverificationcode } = require("../middlewares/Email");

const signup = async (req, res) => {
  try {
    const { name, email, password, contact, role } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    if (role === "admin") {
      const existingAdmin = await User.findOne({ role: "admin" });
      if (existingAdmin) {
        return res.status(400).json({
          message: "Admin account already exists. Only one admin is allowed.",
          success: false,
        });
      }
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString(); // Generate a random 6-digit verification code
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before saving to the database
    const newUser = new User({
      name,
      email,
      contact,
      password: hashedPassword,
      role,
      verificationCode: verificationCode,
      isverified: false,
    });

    await newUser.save(); // Save the user to the database
    await Sendverificationcode(newUser.email, verificationCode);
    res
      .status(201)
      .json({ message: "SignUp successfully", success: true, newUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Return the first validation error message so the client can show it directly
      const firstError = Object.values(error.errors)[0];
      return res.status(400).json({
        message: firstError?.message || "Validation failed",
        success: false,
      });
    }

    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
//verify email
const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await User.findOne({ verificationCode: code });
    if (!user) {
      return res.status(400).json({
        message: "Invalid of Expired verification code",
        success: false,
      });
    }
    user.isverified = true;
    user.verificationCode = undefined;
    await user.save();
    return res
      .status(200)
      .json({ message: "Email verified sucessfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//login system
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }

    const jwttoken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        contact: user.contact,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );
    res.status(200).json({
      message: "Login successful",
      success: true,
      jwttoken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, contact } = req.body;

    if (!name || !contact) {
      return res.status(400).json({
        message: "Name and contact are required",
        success: false,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, contact },
      { new: true },
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
        success: false,
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Current password is incorrect",
        success: false,
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
  getProfile,
  updateProfile,
  changePassword,
  verifyEmail,
};
