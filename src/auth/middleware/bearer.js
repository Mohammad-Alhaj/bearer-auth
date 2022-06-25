'use strict';
const User = require('../models/users-model')
async function bearer(req,res,next){


if(req.headers.authorization){
    try{

        const token = req.headers.authorization.split(" ")[1]
        User.authenticateBearer(token).then(()=>{
            res.status(200).json({
                'message': 'You are authorized to view the user orders',
                'user': req.user
            }); 
            next();
            
        })
        .catch(() => {
            next("Invalid Token");
        })
    }catch(err){
        next(err)
    }

}else{
    next('Token empty')
}
}
module.exports =bearer;