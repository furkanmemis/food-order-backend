const {create,getAll,getById} = require('../services/restaurant');

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
}