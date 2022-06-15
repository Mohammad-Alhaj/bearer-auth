'use strict';
const base64 = require('base-64');
// const {User} = require('../models/index')
const User = require('../models/users-model')


const basic =  (async(req,res,next)=>{
    if(req.headers.authorization){
        const seconde = req.headers.authorization.split(' ')[1]
        const decode = base64.decode(seconde)
        const [username,password] = decode.split(':')
        console.log("username*****",username);
        console.log("password*****",password);

        User.authenticateBasic(username, password)
        .then((validUser) => {
            req.user = validUser;
            res.status(200).json(req.user);
            next();
        })
        .catch((err) => {
            console.error(err);
            res.status(403).send('Invalid Login');
            next();
        })
    }
    })
    
module.exports = basic;