'use strict';
// require('dotenv').config()
const express = require('express');
const app = express();
const UserRouter =require('./auth/router')
const error404 =require('./error-handlers/400')
const errorServer = require('./error-handlers/500')

app.get("/",(req,res)=>{
    res.status(200).send("Welcome in my app 😍")
})







app.use(express.json());
app.use(UserRouter);
app.use(errorServer)
app.use('*',error404)
function start(PORT){
    app.listen(PORT,()=>{
        console.log(`lesson in PORT ${PORT}`)
    })
}
module.exports ={
    app:app,
    start:start
}