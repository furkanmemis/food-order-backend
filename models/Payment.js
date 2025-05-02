const mongoose = require('mongoose');

const Payment = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false, default: "" },
});

module.exports = mongoose.model('Payment', Payment);