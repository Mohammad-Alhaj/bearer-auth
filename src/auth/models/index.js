'use strict';
require('dotenv').config();
const { Sequelize,DataTypes } = require('sequelize');
const user =require('./users-model')

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;
let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ?
    {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    } : {};
let sequelize = new Sequelize(POSTGRES_URI,sequelizeOptions);



// module.exports={
//     dataBase:sequelize,
//    User:user(sequelize,DataTypes),
   
// }

module.exports = { sequelize, DataTypes };
    