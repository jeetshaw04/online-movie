const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieroutes");

app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Movie Booking API Running");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
 .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});