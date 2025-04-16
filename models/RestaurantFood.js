const mongoose = require('mongoose');

const RestaurantFood = new mongoose.Schema({
  name: { type: String, required: true, unique: false },
  restaurantCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "RestaurantCategory" },
  price: {type: Number,required: true, unique: false},
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
});

module.exports = mongoose.model('RestaurantFood', RestaurantFood);