const controller = require('../controllers/questions');
const router = require('express').Router();


//CRUD
router
   .get('/:product_id', controller.getAllQs)
   .get('/:question_id/answers', controller.getAllAnswers)
   .post('/', controller.addOneQuestion)
   .post('/:question_id/answers', controller.addOneAnswer)
   .put('/:question_id/helpful', controller.markQuestionHelpful)


module.exports = router;