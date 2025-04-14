const mongoose = require("mongoose");

const Category = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true, unique: false, default: "" },
});

module.exports = mongoose.model("Category", Category);
