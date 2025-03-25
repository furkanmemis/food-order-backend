const verifyAdmin = (req,res,next) => {

    try{
        const user = req.user;

        if(!user){
            return res.status(404).json({result:"admin user not found"});
        }

        const role = user.role;

        if(!role){
            return res.status(404).json({result:"admin role not found"});
        }
        if(role !=="admin"){
            return res.status(404).json({result:"role must be admin."});
        }
        next();
    }catch(error){
        return res.status(500).json({"verify admin error": error.message});
    }
};

const verifyUser = (req,res,next) => {
    try{
        const user = req.user;
        const id = req.params;

        if(!user){
            return res.status(404).json({"result":"token is must be"})
        }

        if(!id){
            return res.status(404).json({result: "id must be in url"});
        }

        if(id.id !== user._id){
            return res.status(403).json({"result":"You are not allowed to update another user's information."})
        }

        next();

        
    }catch(error){
        return res.status(500).json({"result":"user verify error"});
    }
}

const verifyVendor = (req,res,next) =>{
    try{
        const user = req.user;

        if(user.role !== "vendor"){
            return res.status(401).json({"result":"Vendor only make this"})
        
        }

        next();

    }catch(error){
        return res.status(500).json({"vendor verify error": error});
    }
}

module.exports = {verifyAdmin, verifyUser, verifyVendor}