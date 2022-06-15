'use strict';

const errorServer = ((err,req,res,next)=>{
res.status(500).send({
    code:500,
    message :`error server ${err}`
})

})
module.exports = errorServer;