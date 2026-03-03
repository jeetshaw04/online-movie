const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// ➤ Add Movie
router.post("/add", async (req, res) => {
  try {
    const { name, price } = req.body;

    const newMovie = new Movie({ name, price });
    await newMovie.save();

    res.json({ message: "Movie added successfully" });

  } catch (error) {
    res.status(500).json({ error: "Failed to add movie" });
  }
});

// ➤ Get All Movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

module.exports = router;