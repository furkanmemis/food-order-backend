const User = require('../models/User');
const {login} = require('../services/authentication')


exports.login = async (req,res) =>{
    const {email,password} = req.body;
    try{

        if(!email || !password){
            res.status(400).json({result: "Email and password required for login"})
        }

        const result = await login({email,password})

        res.status(200).json(result);

    }catch(error){
        console.log("Login error -> ",error.message);
        res.status(500).json({message: "Login Error"})
    }


}