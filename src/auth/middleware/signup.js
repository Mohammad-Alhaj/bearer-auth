'use strict';
// const {User} =require('../models/index') 
const User = require('../models/users-model')
const bcrypt = require("bcrypt");

const signup = (async(req,res,next)=>{
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);
    const record = await User.create({ username: username, password: password });
  res.status(201).json(record);

next()
})

module.exports = signup