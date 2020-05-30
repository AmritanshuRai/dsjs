const express = require('express');
const {
  getQuestions,
  getQuestion,
  createQuestion,
} = require('../controllers/questions.controller');
const { Question, questionSchema } = require('../models/Question.model');
const advanceResult = require('../middlewares/advanceResult.middleware');
const { extraKeysInReq } = require('../middlewares/extraKeysInReq.middleware');
const {
  protect,
  authorize,
  checkUserOwnership,
} = require('../middlewares/auth.middleware');

// const courseRouter = require('./courses.routes');
// const reviewRouter = require('./reviews.route');

const router = express.Router();

// //redirect to course routes
// router.use('/:id/courses', courseRouter);

// //redirect to review routes
// router.use('/:id/reviews', reviewRouter);

router
  .route('/')
  .get(advanceResult(Question), getQuestions)
  .post(extraKeysInReq(questionSchema), createQuestion);

router.route('/:id').get(getQuestion);

module.exports = router;
