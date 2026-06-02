# Local Skilled - Main Source Code (Condensed)

**Project:** Worker Booking System | **Stack:** Express.js + React + MongoDB

---

# BACKEND - MAIN FILES

## 1. SERVER SETUP (server.js)

```javascript
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/db");
const router = require("./routes/authRoutes");
const workerRouter = require("./routes/workerRoutes");
const adminRouter = require("./routes/adminRoutes");
const contactRouter = require("./routes/contactRoutes");

const app = express();

// Connect to database
connectDB();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/auth", router);
app.use("/workers", workerRouter);
app.use("/admin", adminRouter);
app.use("/contact", contactRouter);

app.get("/", (req, res) => {
  res.send("Server running successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 2. DATABASE CONFIGURATION (config/db.js)

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

exports.connectDB = connectDB;
```

## 3. USER MODEL (models/user.js)

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 5, maxlength: 100 },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true, minlength: 10, maxlength: 10 },
    password: { type: String, required: true, minlength: 4 },
    role: {
      type: String,
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
```

## 4. WORKER MODEL (models/workermodel.js)

```javascript
const mongoose = require("mongoose");

const workerProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User", required: true },
    category: {
      type: String,
      enum: [
        "plumber",
        "electrician",
        "carpenter",
        "painter",
        "mechanic",
        "ac_repair",
      ],
      required: true,
    },
    experience: { type: String, required: true },
    hourlyRate: { type: Number, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true },
);

const workerModel = mongoose.model("WorkerProfile", workerProfileSchema);
module.exports = workerModel;
```

## 5. REQUEST MODEL (models/request.js)

```javascript
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
    message: { type: String },
  },
  { timestamps: true },
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
```

## 6. AUTH MIDDLEWARE (middlewares/auth.js)

```javascript
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided. Please login first.",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }
};

module.exports = { verifyToken };
```

## 7. AUTH CONTROLLER (controllers/authcontroller.js)

```javascript
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { name, email, password, contact, role } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      contact,
      password: hashedPassword,
      role: role || "customer",
      isverified: false,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "Signup successful", success: true, newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

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
      { id: user.id, email: user.email, role: user.role },
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
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    res.status(200).json({ message: "Profile retrieved", success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = { signup, login, getProfile };
```

## 8. WORKER CONTROLLER (controllers/workercontroller.js)

```javascript
const workerModel = require("../models/workermodel");
const Request = require("../models/request");

const createWorkerProfile = async (req, res) => {
  try {
    const { category, experience, hourlyRate, location } = req.body;
    const Profile = new workerModel({
      userId: req.user.id,
      category,
      experience,
      hourlyRate,
      location,
    });
    await Profile.save();
    res
      .status(201)
      .json({ message: "Worker profile created", success: true, Profile });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getWorkersBycategory = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category: category.toLowerCase() } : {};
    const workers = await workerModel
      .find(query)
      .populate("userId", "name email contact");
    res
      .status(200)
      .json({ message: "Workers fetched", success: true, workers });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getWorkerProfile = async (req, res) => {
  try {
    const workerProfile = await workerModel
      .findOne({ userId: req.user.id })
      .populate("userId", "name email");
    if (!workerProfile) {
      return res
        .status(404)
        .json({ message: "Worker profile not found", success: false });
    }
    res
      .status(200)
      .json({ message: "Profile fetched", success: true, workerProfile });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const createRequest = async (req, res) => {
  try {
    const { workerId, message } = req.body;
    const workerProfile = await workerModel.findById(workerId);
    if (!workerProfile) {
      return res
        .status(404)
        .json({ message: "Worker not found", success: false });
    }

    const request = new Request({
      customerId: req.user.id,
      workerProfileId: workerProfile._id,
      message,
    });
    await request.save();
    res
      .status(201)
      .json({ success: true, message: "Booking request created", request });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getWorkerRequests = async (req, res) => {
  try {
    const workerProfile = await workerModel.findOne({ userId: req.user.id });
    if (!workerProfile) {
      return res
        .status(404)
        .json({ message: "No worker profile", success: false });
    }
    const requests = await Request.find({
      workerProfileId: workerProfile._id,
    }).populate("customerId", "name email");
    res.json({ success: true, requests });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  createWorkerProfile,
  getWorkersBycategory,
  getWorkerProfile,
  createRequest,
  getWorkerRequests,
};
```

## 9. ADMIN CONTROLLER (controllers/admincontroller.js)

```javascript
const User = require("../models/user");
const Request = require("../models/request");
const workerModel = require("../models/workermodel");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ message: "All users", success: true, data: users });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getAllWorkers = async (req, res) => {
  try {
    const workers = await User.find({ role: "worker" }).select("-password");
    res
      .status(200)
      .json({ message: "All workers", success: true, data: workers });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("customerId", "name email")
      .populate("workerProfileId");
    res
      .status(200)
      .json({ message: "All requests", success: true, data: requests });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalWorkers = await User.countDocuments({ role: "worker" });
    const totalRequests = await Request.countDocuments();
    const completedRequests = await Request.countDocuments({
      status: "completed",
    });

    res.status(200).json({
      message: "Dashboard stats",
      success: true,
      data: { totalUsers, totalWorkers, totalRequests, completedRequests },
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  getAllUsers,
  getAllWorkers,
  getAllRequests,
  getDashboardStats,
};
```

---

# FRONTEND - MAIN FILES

## 10. MAIN APP COMPONENT (src/App.jsx)

```javascript
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import Contact from "./pages/Contact";
import CategoryWorkers from "./components/CategoryWorkers";
import AllWorkers from "./components/AllWorkers";
import Workerform from "./components/auth/Workerform";
import Request from "./pages/Request";
import Booking from "./pages/Booking";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/worker-form" element={<Workerform />} />
      <Route path="/category/:categoryName" element={<CategoryWorkers />} />
      <Route path="/all-workers" element={<AllWorkers />} />
      <Route path="/requests" element={<Request />} />
      <Route path="/bookings" element={<Booking />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
```

## 11. ENTRY POINT (src/main.jsx)

```javascript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

## 12. UTILITY FUNCTIONS (src/utils/util.jsx)

```javascript
import { toast } from "react-toastify";

export const notifySuccess = (message) => {
  toast.success(message, { position: "top-right", autoClose: 3000 });
};

export const notifyError = (message) => {
  toast.error(message, { position: "top-right", autoClose: 3000 });
};

export const notifyLogout = (message) => {
  toast.info(message, { position: "top-right", autoClose: 3000 });
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};
```

## 13. KEY COMPONENTS (src/components/)

- **Categorycard.jsx** - Service category card display
- **Navigation.jsx** - Top navigation with search and user menu
- **Footer.jsx** - Footer with links and contact info
- **Slider.jsx** - Image carousel for services
- **CategoryWorkers.jsx** - Workers filtered by category
- **AllWorkers.jsx** - List all available workers

## 14. KEY PAGES (src/pages/)

- **Login.jsx** - User authentication
- **Signup.jsx** - User registration
- **Home.jsx** - Landing page with categories
- **UserProfile.jsx** - User profile management
- **Contact.jsx** - Contact form
- **Request.jsx** - Worker booking requests
- **Booking.jsx** - Customer bookings list
- **AdminDashboard.jsx** - Admin statistics and management

## 15. BACKEND DEPENDENCIES (package.json)

```json
{
  "dependencies": {
    "express": "^5.2.1",
    "mongoose": "^9.3.0",
    "bcrypt": "^6.0.0",
    "jsonwebtoken": "^9.0.3",
    "cors": "^2.8.6",
    "dotenv": "^17.3.1",
    "joi": "^18.0.2",
    "nodemailer": "^8.0.7"
  }
}
```

## 16. FRONTEND DEPENDENCIES (package.json)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.18.0",
    "bootstrap": "^5.3.2",
    "react-bootstrap": "^2.10.0",
    "axios": "^1.6.0",
    "react-toastify": "^9.1.3"
  }
}
```

## 17. ENVIRONMENT VARIABLES (.env)

```
MONGO_URI=mongodb://localhost:27017/localskilled
JWT_SECRET=your_jwt_secret_key
PORT=5000
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

---

## SUMMARY

**Backend Routes:**

- `/auth` - Register, Login, Profile, Email Verification
- `/workers` - Create profile, List workers, Create/Get requests
- `/admin` - Dashboard stats, Users, Workers, Requests
- `/contact` - Send contact emails

**Frontend Routes:**

- `/` → Login
- `/home` - Service categories & workers
- `/profile` - User account management
- `/category/:name` - Filter workers by category
- `/requests` - Worker booking requests
- `/bookings` - Customer bookings
- `/admin` - Admin dashboard

**Key Features:**
✅ User authentication (JWT)  
✅ Worker profile management  
✅ Booking requests system  
✅ Admin dashboard  
✅ Email verification  
✅ Category-wise filtering  
✅ Responsive UI (Bootstrap + React)
