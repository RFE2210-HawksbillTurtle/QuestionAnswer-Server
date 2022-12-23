const Question = require('../models/questions');
const Answers = require('../models/answers');

exports.getAllQs = async (req, res, next) => {
  try {
    const ALL = await Question.findAll({
      where: {
        product_id: Number(req.params.product_id)
      },
      raw: true
    });

    return res.status(200).json(ALL);
  } catch (err) {
    console.log(err.message)
    return res.status(500).json(err);
  }
};

exports.getAllAnswers = async (req, res, next) => {
  console.log(req.params);
  try {
    const ALL = await Question.findAll({
      where: {
        product_id: Number(req.params.question_id)
      },
      raw: true
    });

    return res.status(200).json(ALL);
  } catch (err) {
    console.log(err.message)
    return res.status(500).json(err);
  }
};

exports.addOneQuestion = async (req, res, next) => {
  console.log(req.body)
  try {
    const question = await Question.create({
      product_id: req.body.product_id,
      body: req.body.body,
      date_written: req.body.date_written,
      asker_name: req.body.asker_name,
      asker_email: req.body.asker_email,
      reported: 0,
      helpful: 0

    });
    return res.status(201).json(question);
  } catch (err) {
    return res.status(500).json(err);
  }
}