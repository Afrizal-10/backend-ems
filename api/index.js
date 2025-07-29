const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("../config/db");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//  folder untuk gambar upload
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Connect to database
connectDB();

// Routes
app.use("/api/auth", require("../routes/authRoutes"));
app.use("/api/seminars", require("../routes/seminarRoutes"));
app.use("/api/registrations", require("../routes/registrationRoutes"));

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
