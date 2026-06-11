const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // Import body-parser middleware
require("dotenv").config(); // Load environment variables from .env file
const { connectDB } = require("./config/db");
const router = require("./routes/authRoutes");
const workerRouter = require("./routes/workerRoutes");
const adminRouter = require("./routes/adminRoutes");
const contactRouter = require("./routes/contactRoutes");

const app = express();

//connect to database
connectDB();

app.use(
  cors({
    origin: [
      "https://urbanfixes.netlify.app",
      "https://urbanfix-backend-production.up.railway.app",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies (built-in middleware in Express)
// app.use(bodyParser.json()); // Remove redundant body-parser
app.use("/auth", router); // Use the auth routes for any requests to /auth
app.use("/workers", workerRouter); // Use the worker routes for any requests to /worker
app.use("/admin", adminRouter); // Use the admin routes for any requests to /admin
app.use("/contact", contactRouter); // Use the contact routes for any requests to /contact

//creating a basic server

app.get("/", (req, res) => {
  res.send("Server is runnning  sucessfully..");
});

//posrt defining
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on the port ${PORT}`);
});
