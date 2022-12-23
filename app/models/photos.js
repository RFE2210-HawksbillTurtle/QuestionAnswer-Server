const Sequelize = require('sequelize');
const db = require('../util/database');

const Photos = db.define('Photos', {
  answer_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
})




module.exports = Photos;