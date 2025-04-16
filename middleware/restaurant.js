const Restaurant = require('../models/Restaurant');

const verifyRestaurantOwner = async (req,res,next) =>{
    try{
        const user = req.user;
        const restaurantId = req.body.restaurantId;

        const currentRestaurant = await Restaurant.findOne({_id:restaurantId});
        if(!currentRestaurant){
            return res.status(404).json({"result":"restaurant id is must be"})
        }

        if(currentRestaurant.vendorInformation._id.toString() !== user._id){
            return res.status(401).json({"result": "only restaurant owner make this"})
        }

        next();

    }catch(error){
        return res.status(500).json({"vendor verify error": error});
    }
};

module.exports = {verifyRestaurantOwner};