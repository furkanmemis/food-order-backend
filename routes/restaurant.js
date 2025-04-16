const express = require('express');
const {createRestaurant,getAllRestaurant,getByIdRestaurant, createRestaurantCategory, getAllRestaurantCategory,createRestaurantFood,getAllRestaurantFood} = require('../controller/restaurant');
const {verifyJWT} = require('../middleware/authentication');
const {verifyVendor} = require('../middleware/user');
const {verifyRestaurantOwner} = require('../middleware/restaurant');

const router = express.Router();
router.post('/create-restaurant',verifyJWT,verifyVendor,createRestaurant);
router.get('/get-all-restaurant',verifyJWT,getAllRestaurant);
router.get('/get-restaurant/:id',verifyJWT,getByIdRestaurant);
router.post('/create-restaurant-category',verifyJWT,verifyVendor ,verifyRestaurantOwner ,createRestaurantCategory);
router.get('/get-all-restaurant-category/:id',verifyJWT,getAllRestaurantCategory);
router.post('/create-restaurant-food', verifyJWT,verifyVendor,verifyRestaurantOwner ,createRestaurantFood);
router.get('/get-all-restaurant-food/:restaurantId',verifyJWT,getAllRestaurantFood);


module.exports = router;
