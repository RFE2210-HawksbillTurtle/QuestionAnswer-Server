const Question = require('../models/questions');
const Answers = require('../models/answers');
const Photos = require('../models/photos');
const sequelize = require('../util/database');



exports.getAllQs = async (req, res, next) => {
  try {
    const { page, count } = req.query;
    const ALL = await Question.findAll({
      limit: count,
      where: {
        product_id: Number(req.params.product_id)
      },
      raw: true,
      // benchmark: true,
      // logging: console.log
    });


    ALL.filter((question) => {
      question.reported === 0;
    })

    return res.status(200).json({
      product_id: req.params.product_id,
      results: ALL
    });
  } catch (err) {
    console.log(err.message)
    return res.status(500).json(err);
  }
};

exports.getAllAnswers = async (req, res, next) => {
  try {
    let { page, count } = req.query;
    count ? count : count = 5
    const ALL = await Question.findAll({
      limit: count,
      where: {
        product_id: Number(req.params.question_id)
      },
      raw: true,
      // benchmark: true,
      // logging: console.log
    });

    return res.status(200).json({
      question: req.params.question_id,
      page: req.query.page,
      count: req.query.count,
      results: ALL
    });
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

    }, {
      benchmark: true,
      logging: console.log
    });

    if (question.id) {
      console.log('Successfully added one question to the database');
      return res.status(201).json(question);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}

exports.addOneAnswer = async (req, res, next) => {
  let date = Date.now();
  let photos = null;
  try {
    const result = await sequelize.transaction(async (t) => {

      const answer = await Answers.create({
        question_id: req.params.question_id,
        body: req.body.body,
        date_written: date,
        answerer_name: req.body.name,
        answerer_email: req.body.email,
        reported: 0,
        helpful: 0
      }, { transaction: t,
          benchmark: true,
          logging: console.log
        });

      if (req.body.photos.length > 0) {
        let arr = [];
        for (let i = 0; i < req.body.photos.length; i++) {
          arr.push({answer_id: answer.dataValues.id, url: req.body.photos[i]})
        }

        photos = await Photos.bulkCreate(arr, {
          transaction: t,
          benchmark: true,
          logging: console.log
        });
      }

     return photos !== null ? [answer, photos] : [answer]
    })
    return res.status(201).json(result);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err);
  }
}

exports.markQuestionHelpful = async (req, res, next) => {
  try {
    await Question.update({
      helpful: sequelize.literal('helpful + 1')
      },
      {
        where: {
          id: req.params.question_id
        }
    });
    if (Question[0] === 1) {
      console.log('Successfully marked question as helpful');
      return res.status(204).end();
    }
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.reportQuestion = async (req, res, next) => {
  try {
    await Question.update({
      helpful: sequelize.literal('reported + 1')
      },
      {
        where: {
          id: req.params.question_id
        }
    });
    if (Question[0] === 1) {
      console.log('Successfully reported question');
      return res.status(204).end();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

