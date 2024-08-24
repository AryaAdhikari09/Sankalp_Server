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

// Root Route to prevent 404 on /
app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});

// Additional logging for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use("/api/user", require("./routes/UserRoute"));
app.use("/api/result", require("./routes/ResultRoute"));

// Handle favicon requests to prevent 404 errors
app.get('/favicon.ico', (req, res) => res.status(204));

// Catch-all 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).send("404 Not Found");
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on ${process.env.CLIENT_URL}:${process.env.PORT}`);
  console.log("Server is live");
});
