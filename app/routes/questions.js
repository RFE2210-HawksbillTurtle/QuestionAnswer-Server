const controller = require('../controllers/questions');
const router = require('express').Router();


//CRUD
router
   .get('/:product_id', controller.getAllQs)
   .get('/:question_id/answers', controller.getAllAnswers);



module.exports = router;