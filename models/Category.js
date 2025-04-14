const mongoose = require('mongoose');

const Category = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  imageId: {type: String,required: false, unique: true, default: ""},
});

module.exports = mongoose.model('Category', Category);