const express = require('express');
const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestions,
} = require('../controllers/questions.controller');
const { Question, questionSchema } = require('../models/Question.model');
const advanceResult = require('../middlewares/advanceResult.middleware');
const { extraKeysInReq } = require('../middlewares/extraKeysInReq.middleware');
const {
  protect,
  authorize,
  checkUserOwnership,
} = require('../middlewares/auth.middleware');

const levelRouter = require('./level.route');

const router = express.Router();

//redirect to level routes
router.use('/:id/level', levelRouter);

router
  .route('/')
  .get(advanceResult(Question), getQuestions)
  .post(protect, createQuestion)
  .delete(deleteQuestions);

router
  .route('/:id')
  .get(getQuestion)
  .put(extraKeysInReq(questionSchema), updateQuestion);

module.exports = router;
