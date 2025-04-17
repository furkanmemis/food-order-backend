const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (data) => {
    try{
        const {email, password} = data;
        const user = await User.findOne({email});

        if(!user){
            throw new Error('User not found with this email');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error('Invalid password');
        }
        const token = jwt.sign({email, role: user.role, date: new Date(),_id:user._id}, 'zeynep', { expiresIn: '1h' });
        if(!token){
            throw new Error("JWT sign error");
        }

        console.log("Login success: "+ user.name + " "+user.surname)

        return {result: "Success", user: {email, token, name: user.name, surname: user.surname, role: user.role, id: user._id},date: new Date()};

    } catch(error){
        throw new Error(error.message);
    }
}