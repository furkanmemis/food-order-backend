const express = require('express');
const {createRestaurant,getAllRestaurant,getByIdRestaurant} = require('../controller/restaurant');
const {verifyJWT} = require('../middleware/authentication');
const {verifyVendor} = require('../middleware/user');

const router = express.Router();
router.post('/create-restaurant',verifyJWT,verifyVendor,createRestaurant);
router.get('/get-all-restaurant',verifyJWT,getAllRestaurant);
router.get('/get-restaurant/:id',verifyJWT,getByIdRestaurant);


module.exports = router;
