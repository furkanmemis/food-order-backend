const {create,getAll,getById, createRestaurantCategory, getAllRestaurantCategory, createRestaurantFood, getAllRestaurantFood} = require('../services/restaurant');

exports.createRestaurant = async(req,res) =>{
    
    try{

        const data = req.body;
        const id = req.user._id;

        const result = await create(data,id);

        res.status(200).json(result)
        
    }catch(error){
        res.status(500).json({"Restaurant create error":error.message});
    }
}

exports.getAllRestaurant = async(req,res) =>{
    try{

        const allRestaurant = await getAll();

        res.status(200).json(allRestaurant);
        
    }catch(error){
        res.status(500).json({"Restaurant get all error ": error.message})
    }
}

exports.getByIdRestaurant = async(req,res) => {
    try{

        const id = req.params.id;

        const restaurant = await getById(id);

        res.status(200).json(restaurant);

    }catch(error){
        res.status(500).json({"Restaurant get by id error ": error.message})

    }
};

exports.createRestaurantCategory = async(req,res) =>{
    try{

        const body = req.body;

        if(!body){
            res.status(404).json({message:"Body must be in"});
        }

        const result = await createRestaurantCategory(body);

        res.status(200).json(result);

    }catch(error){
        res.status(500).json({message: "Restaurant category create error "+ error.message})
    }
};

exports.getAllRestaurantCategory = async (req,res) =>{
    try{

        const params = req.params;
        const restaurantId = params.id;

        const allCategory = await getAllRestaurantCategory(restaurantId);

        if(!allCategory || !allCategory.length === 0){
            res.status(200).json([]);
        }

        res.status(200).json(allCategory);

    }catch(error){
        res.status(500).json({message: "Restaurant get all category error "+error.message});
    }
};

exports.createRestaurantFood = async (req,res) =>{
    try{

        const body = req.body;

        if(!body){
            res.status(404).json({error:"Body must be in"})
        }

        const result = await createRestaurantFood(body);

        if(!result){
            res.status(404).json({error:"Restaurant result error"});
        }

        res.status(200).json(result);

    }catch(error){
        res.status(500).json({"error":"Create resturant error "+error.message});
    }
};

exports.getAllRestaurantFood = async(req,res) =>{
    try{

        const {restaurantId} = req.params;

        if(!restaurantId){
            res.status(404).json({error:"restaurant id and restaurant category id must be in"})
        }

        const allFood = await getAllRestaurantFood({restaurantId});

        res.status(200).json(allFood);

    }catch(error){
        res.status(500).json({error: "Get all restaurant food error "+ error.message});
    }
}