'use srtict';

const error404 = ((req,res)=>{
res.status(404).send({
    cone:404,
    path :`the path is ${req.path}`,
    message :`The page error`
})

});

module.exports = error404