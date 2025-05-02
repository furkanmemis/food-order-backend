const Payment = require('../models/Payment');


const create = async(data) =>{
 try{

    const {name, description} = data;

    if(!name){
        throw new Error('Payment name should be have')
    }

    const existPayment = await Payment.findOne({name: name});

    if(existPayment){
        throw new Error('This name already exist')
    }

    const newPayment = new Payment({name,description: description ?? ""});

    await newPayment.save();

    return {message: "Success"}

 }  catch(error){

    throw new Error('Payment create error -> '+error.message);

 } 
};

const getId = async(id) => {
    try{

        if(!id){
            throw new Error('id should be have')
        }

        const payment = await Payment.findOne({_id:id});

        if(!payment){
            return {}
        }

        return payment;
        
    }catch(error){
        throw new Error('Get id payment error '+ error.message);
    }
};


const getAll = async () =>{
    try{

        const payments = await Payment.find();

        return payments;

    }catch(error){
        throw new Error('Get all payment error '+error.message);
    }
};


const update = async(newData, id) => {
    try{

        if(!id){
            throw new Error('Id should be have');
        }

        const exist = await Payment.findOne({_id:id});

        if(!exist){
            throw new Error('Any payment not found with this id -> '+id);
        }

        const updatedPayment = await Payment.findOneAndUpdate({_id:id},newData);

        if(!updatedPayment){
            throw new Error('Payment update error');
        }

        return ({message: "Success"})

    }catch(error){
        throw new Error('Payment update error '+error.message);
    }
};


const deletePayment = async(id) =>{
    try{
        if(!id){
            throw new Error('id should be have')
        }

        const exist = await Payment.findOne({_id:id});

        if(!exist){
            throw new Error('Any payment not found with this id');
        }
        const item = await Payment.deleteOne({_id:id});

        if(!item){
            throw new Error('Payment delete error');
        }

        return{message: "Success"}

    }catch(error){
        throw new Error('Payment delete error '+ error.message);
    }
}


module.exports = {create,getId, getAll, update,deletePayment};