const mongoose = require('mongoose');

const Restaurant = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  vendorInformation: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model('Restaurant', Restaurant);