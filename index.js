'use strict';
const server = require('./src/server')
require('dotenv').config()
const PORT = process.env.PORT ||3001;

// const {dataBase} = require('./src/auth/models/index');
const {sequelize} = require('./src/auth/models/index')


sequelize.sync().then(()=>{

    server.start(PORT);

})  .catch((e) => {
    throw new Error("error in app");
});