const Sequelize = require('sequelize');
const db = require('../util/database');

const Question = db.define('questions', {
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  body: {
    type: Sequelize.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  date_written: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  asker_name: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  asker_email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  reported: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  helpful: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false
})

module.exports = Question;