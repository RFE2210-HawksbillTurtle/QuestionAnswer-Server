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
  let date = Date.now();
  try {
    const question = await Question.create({
      product_id: req.body.product_id,
      body: req.body.body,
      date_written: date,
      asker_name: req.body.name,
      asker_email: req.body.email,
      reported: 0,
      helpful: 0

    });
    console.log('Successfully added one question to the database');
    return res.status(201).json(question);
  } catch (err) {
    return res.status(500).json(err);
  }
}