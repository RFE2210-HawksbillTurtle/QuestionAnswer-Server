const Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../.env')});

const sequelize = new Sequelize(process.env.PGDB, process.env.PGUSER, process.env.PGPASS, {
  dialect: 'postgres',
  host: process.env.PGHOST,
  logging: false
});

module.exports = sequelize;