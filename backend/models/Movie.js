const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Movie", MovieSchema);