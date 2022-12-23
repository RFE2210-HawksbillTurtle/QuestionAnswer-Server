const Sequelize = require('sequelize');
const db = require('../util/database');

const Photos = db.define('photos', {
  answer_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
}, {
  timestamps: false
})




module.exports = Photos;