'use strict';
require('dotenv').config()
 const bcrypt = require("bcrypt");
 const jwt = require('jsonwebtoken');
 const SECRETE = process.env.SECRETE
 const { sequelize, DataTypes } = require("./index");
//  (sequelize,DataTypes)=>
 const User = sequelize.define("user",{
    username:{
        type: DataTypes.STRING,
        allNull:false,
        unique:true
    },
    password:{
        type: DataTypes.STRING,
        allNull:false,
    },
    token: {
        type: DataTypes.VIRTUAL,
    }
});
//................................User.authenticateBasic................................................
User.authenticateBasic = async function (username, password) {
    console.log('from users.model.js', User);

    const user = await User.findOne({ where: { username: username } })

    const valid = await bcrypt.compare(password, user.password)
    if (valid) {
        console.log('************************', valid);

        let newToken = jwt.sign({ username: user.username }, SECRETE,{expiresIn:'900s'});
         console.log('************************', newToken);
        user.token = newToken;
        return user;
    }
    else {
        throw new Error("Invalid user");
    }
}
//................................User.authenticateBearer................................................
User.authenticateBearer = (async(token)=>{
    const tToken = jwt.verify(token,SECRETE)
    console.log('*********************tToken***', tToken);

    const user = await User.findOne({username:tToken.username})
    if(user.username){
       return user 
    } 
 else {
    throw new Error("Invalid Token");
}
})


module.exports = User