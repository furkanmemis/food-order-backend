const {createUser, getUserByID, getAllUser, deleteUser, updateUser} = require('../services/user');

exports.createUser = async (req,res) => {
    
    try{
        const {name,surname,email,password,role} = req.body;
        const result = await createUser({name,surname,email,password,role})

        res.status(200).json(result);

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

exports.getUserByID = async(req,res) => {
    try{
        const {id} = req.params;
        const user = await getUserByID(id);

        res.status(200).json(user);

    }catch(error){
        res.status(500).json({"get user by id: ": error.message})
    }
}

exports.getAllUser = async(req,res) => {
    try{

        const allUser = await getAllUser();

        res.status(200).json(allUser);

    }catch(error){
        res.status(500).json({"get all user: ":error.message})
    }
}

exports.deleteUser = async(req,res) => {
    try{
        const id = req.params;
        const result = await deleteUser(id)
        if(!result){
            res.status(400).json({result: "delete user error"});
        }
        res.status(200).json({result: "success"});
    }catch(error){
        res.status(500).json({"delete user error: ": error.message})
    }
}

exports.updateUser = async(req,res) => {
    try{
        const id = req.params;
        const body = req.body;

        const result = await updateUser(id.id,body);

        if(!result){
            res.status(404).json({"result": "Update error not found"})
        }

        res.status(200).json(result);

    }catch(error){
        res.status(500).json({"update user error: ": error.message});
    }
}