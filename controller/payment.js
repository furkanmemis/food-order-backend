const {create,getId,getAll,update,deletePayment} = require('../services/payment');


exports.createPayment = async(req,res) =>{
    try{

        const data = req.body;

        if(!data){
            res.status(400).json({message: "Body not found"})
        };

        const result = await create(data);

        res.status(200).json(result);

    }catch(error){
        res.status(500).json({error:error.message})
    }
};

exports.getIdPayment = async(req,res) =>{
    try{

        const id = req.params.id;

        if(!id){
            res.status(400).json({message: "Id should be have"})
        }

        const payment = await getId(id);

        res.status(200).json(payment);
        
    }catch(error){
        res.status(500).json(error)
    }
};

exports.getAllPayment = async(req,res) =>{
    try{

        const payments = await getAll();

        if(!payments || payments.length === 0){
            return res.status(200).json([]);
        }
        res.status(200).json(payments)
    }catch(error){
        res.status(500).json({error:"error get all payment"});
    }
};

exports.updatePayment = async(req,res) =>{
    try{

        const id = req.params.id;
        const body = req.body;

        if(!id || !body){
            res.status(400).json({message: 'id and body should be have'});
        }

        const result = await update(body,id);

        if(!result){
            res.status(400).json({message: "Payment error"});
        }

        res.status(200).json(result)


    }catch(error){
        res.status(500).json(error);
    }
};

exports.deletePayment = async(req,res) =>{
    try{

        const id = req.params.id;

        if(!id){
            res.status(404).json({message: 'id should be have'});
        }

        const item = await deletePayment(id);

        if(!item){
            res.status(400).json({message: 'delete payment error'});
        }

        res.status(200).json(item);

    }catch(error){
        res.status(500).json(error);
    }
};