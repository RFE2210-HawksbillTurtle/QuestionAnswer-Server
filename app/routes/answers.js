const controller = require('../controllers/answers');
const router = require('express').Router();

router
  .put('/:answer_id/helpful', controller.markAnswerHelpful)
  .put('/:answer_id/report', controller.reportAnswer);


module.exports = router;