const controller = require('../controllers/questions');
const router = require('express').Router();


//CRUD
router
   .get('/:product_id', controller.getAllQs)
   .get('/:question_id/answers', controller.getAllAnswers)
   .post('/', controller.addOneQuestion);


module.exports = router;