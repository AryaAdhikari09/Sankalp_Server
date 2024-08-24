require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./database");

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`[DEBUG] Incoming request: ${req.method} ${req.url}`);
  next();
});

// Set up CORS to allow your client URL
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
try {
  app.use("/api/user", require("./routes/UserRoute"));
  console.log("[DEBUG] User routes loaded successfully.");
} catch (error) {
  console.error("[ERROR] Failed to load User routes:", error);
}

try {
  app.use("/api/result", require("./routes/ResultRoute"));
  console.log("[DEBUG] Result routes loaded successfully.");
} catch (error) {
  console.error("[ERROR] Failed to load Result routes:", error);
}

// Catch-all route handler for 404 errors
app.use((req, res, next) => {
  console.log(`[DEBUG] 404 Not Found: ${req.method} ${req.url}`);
  res.status(404).send("404: Not Found");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(500).send("Internal Server Error");
});

// Start the server
app.listen(process.env.PORT, process.env.IP, () => {
  connectDB();
  console.log(`[DEBUG] Server is running on ${process.env.IP}:${process.env.PORT}`);
});
