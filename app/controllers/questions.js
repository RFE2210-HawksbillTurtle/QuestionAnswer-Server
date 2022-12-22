const Question = require('../models/questions');


exports.getAll = async (req, res, next) => {
  console.log(req.params)
  try {
    const ALL = await Question.findAll({
      where: {
        product_id: Number(req.params.product_id)
      }
    });

    return res.status(200).json(ALL);
  } catch (err) {
    console.log(err.message)
    return res.status(500).json(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const question = await Question.findByPk(req.params.id);
    return res.status(200).json(question);
  } catch (err) {
    return res.status(500).json(err);
  }
}