const Answers = require('../models/answers');
const sequelize = require('../util/database');

exports.markAnswerHelpful = async (req, res, next) => {
  console.log(req.params.answer_id)
  try {
    let test = await Answers.update({
      helpful: sequelize.literal('helpful + 1')
      },
      {
        where: {
          id: req.params.answer_id
        },
        returning: true
    });
    if (test[0] === 1) {
      console.log('Successfully marked answer as helpful');
      return res.status(204).end();
    }
    // throw 'Error Updating Answer'
  } catch (err) {
    return res.status(500).json(err);
  }
}


exports.reportAnswer = async (req, res, next) => {
  try {
    let report = await Answers.update({
      helpful: sequelize.literal('reported + 1')
      },
      {
        where: {
          id: req.params.answer_id
        }
    });
    if (report[0] === 1) {
      console.log('Successfully reported answer');
      return res.status(204).end();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}