const Answers = require('../models/answers');
const sequelize = require('../util/database');

exports.markAnswerHelpful = async (req, res, next) => {
  try {
    await Answers.update({
      helpful: sequelize.literal('helpful + 1')
      },
      {
        where: {
          id: req.params.answer_id
        }
    });
    console.log('Successfully marked answer as helpful');
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}


exports.reportAnswer = async (req, res, next) => {
  try {
    await Answers.update({
      helpful: sequelize.literal('reported + 1')
      },
      {
        where: {
          id: req.params.answer_id
        }
    });
    console.log('Successfully reported answer');
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}