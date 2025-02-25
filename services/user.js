const bcrypt = require('bcrypt');
const User = require('../models/User');

const createUser = async(data) => {
    try{
        const {name,email,surname,password} = data;

        if(!name || !email || !surname || !password){
            throw new Error('name, email, surname and password are required!')
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.findOne({email});

        if(user){
            throw new Error('This email already exits!')
        }

        const newUser = new User({
            email: email,
            name: name,
            password: hashedPassword,
            surname: surname,
            role:"user"
        })

        await newUser.save();
        console.log("User created ", newUser.name + " "+newUser.surname);
        return{result: "Success"}
    }catch(error){
        throw new Error('User create error: '+ error.message);
    }
}

const getUserByID = async(id) =>{
    try{
        const user = await User.findById({_id: id})
        return {user};
        
    }catch(error){
        throw new Error('getUserByID error: '+error.message);
    }
}

const getAllUser = async() => {
    try{

        const allUser = await User.find();

        return {allUser};

    }catch(error){
        throw new Error('getAllUser error: '+error.message);
    }
}

const deleteUser = async(id) =>{
    try{

        const deletedUser = await User.findByIdAndDelete(id.id);

        if(!deletedUser){
            throw new Error('delete user error');
        }

        return{result: "Success"};
        
    }catch(error){
        throw new Error('deleteUser error: '+error.message);
    }
}

const updateUser = async(id,newUserData) => {
    try{

        if(!id || !newUserData){
            throw new Error('id and new user data must be in your request.')
        }

        const currentUser = await User.findById(id);

        if(!currentUser){
            throw new Error('Any user not found with this id');
        }

        if('role' in newUserData){
            throw new Error('You can`t update your role');
        }

        if('password' in newUserData){
            newUserData.password = await bcrypt.hash(newUserData.password,10);
        }

        const updatedUser = await User.findByIdAndUpdate(id,newUserData);

        if(!updatedUser){
            throw new Error('User update error');
        }

        return {result: "Success"};
    }catch(error){
        throw new Error('User update error: '+ error.mesage)
    }
}

module.exports = {createUser, getUserByID, getAllUser, deleteUser, updateUser}