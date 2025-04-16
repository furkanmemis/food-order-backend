const mongoose = require('mongoose');

const RestaurantCategory = new mongoose.Schema({
  name: { type: String, required: true, unique: false },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
});

module.exports = mongoose.model('RestaurantCategory', RestaurantCategory);