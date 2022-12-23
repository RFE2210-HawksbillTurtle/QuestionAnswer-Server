const Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../.env')});

const sequelize = new Sequelize(process.env.PGDB, process.env.PGUSER, process.env.PASS, {
  dialect: 'postgres',
  host: 'localhost',
  logging: false
});



module.exports = sequelize;