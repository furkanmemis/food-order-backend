const mongoose = require('mongoose');

const Restaurant = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model('Restaurant', Restaurant);