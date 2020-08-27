const express = require('express');
const router = express.Router();

const questionController = require('../controller/questionController');
const answerController = require('../controller/answerController');

router.get('/question', questionController.all);
router.get('/question/:id', questionController.getOne);
router.post('/question', questionController.create);
router.put('/question/:id', questionController.update);
router.delete('/question', questionController.create);

router.get('/answer', answerController.all);
router.get('/answer/:id', answerController.getOne);
router.post('/answer', answerController.create);
router.put('/answer/:id', answerController.update);
router.delete('/answer', answerController.create);
router.get('/answerOfQuestion/:question_id', answerController.getByQuestion);

module.exports = router;