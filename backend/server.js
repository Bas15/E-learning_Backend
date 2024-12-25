const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const multer = require("multer");
const cors = require("cors");

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to parse form data
const upload = multer();
app.use(upload.none());

app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/auth", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
