import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import CategoryWorkers from "./components/CategoryWorkers";
import AllWorkers from "./components/AllWorkers";
import Category_count from "./components/Category_count";
import Workerform from "./components/auth/Workerform";
import { AnimatePresence } from "framer-motion";
import Request from "./pages/Request";
import Booking from "./pages/Booking";
import VerifyEmail from "./components/auth/VerifyEmail";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Navigate to={"/login"}></Navigate>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/worker-form" element={<Workerform />} />
        <Route path="/category/:categoryName" element={<CategoryWorkers />} />
        <Route path="/all-workers" element={<AllWorkers />} />
        <Route path="/category-counts" element={<Category_count />} />
        <Route path="/requests" element={<Request />} />
        <Route path="/bookings" element={<Booking />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
