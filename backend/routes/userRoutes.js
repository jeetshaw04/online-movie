const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");

// REGISTER ROUTE
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

module.exports = router;