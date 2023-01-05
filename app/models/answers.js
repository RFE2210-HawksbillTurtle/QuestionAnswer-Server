const Sequelize = require('sequelize');
const db = require('../util/database');

const Answers = db.define('answers', {
  question_id: {
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
  answerer_name: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  answerer_email: {
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

module.exports = Answers;