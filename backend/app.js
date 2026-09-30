const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

connectToDb();

app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));
app.use(express.json({ limit: "10kb" })); // Limit body size to prevent DOS
app.use(helmet({ crossOriginResourcePolicy: false })); // Set security HTTP headers



// Rate limiting to prevent brute force attacks
const limiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 150, message: "Too many requests from this IP, please try again in 10 minutes" });
app.use("/users/login", limiter);
app.use("/admins/login", limiter);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const uploadDir = process.env.VERCEL ? "/tmp" : path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadDir));

const adminRoutes = require("./routes/admin.routes");
const blogRoutes = require("./routes/blog.routes");
const userRoutes = require("./routes/user.routes");

app.use("/admins", adminRoutes);
app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;
