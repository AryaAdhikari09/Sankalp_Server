require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");

const connectDB = require("./database");

// Set up CORS to allow your Vercel deployment
app.use(
  cors({
    origin: [
      // "http://127.0.0.1:3000",
      process.env.CLIENT_URL,
      // "http://localhost:5173",
      // "https://sankalp-lrn6khqjv-aryas-projects-6ac239bc.vercel.app"
    ],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", require("./routes/UserRoute"));
app.use("/api/result", require("./routes/ResultRoute"));

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on ${process.env.IP}:${process.env.PORT}`);
});
