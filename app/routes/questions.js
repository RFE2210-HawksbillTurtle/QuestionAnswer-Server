const controller = require('../controllers/questions');
const router = require('express').Router();


//CRUD
router
   .get('/:product_id', controller.getAll);



module.exports = router;