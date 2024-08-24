require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./database");

// Set up CORS to allow your client URL
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/api/user", require("./routes/UserRoute"));
app.use("/api/result", require("./routes/ResultRoute"));

// Catch-all route handler for 404 errors
app.use((req, res, next) => {
  res.status(404).send("404: Not Found");
});

// Start the server
app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on ${process.env.IP}:${process.env.PORT}`);
});
