const express = require('express');
const {
  getPendingQuestion,
  getPendingQuestions,
  updatePendingQuestion,
  createPendingQuestion,
  deletePendingQuestions,
} = require('../controllers/pendingQuestions.controller');
const {
  PendingQuestion,
  pendingQuestionSchema,
} = require('../models/PendingQuestion.model');
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
  .get(advanceResult(PendingQuestion), getPendingQuestions)
  .post(extraKeysInReq(pendingQuestionSchema), protect, createPendingQuestion)
  .delete(deletePendingQuestions);

router
  .route('/:id')
  .get(getPendingQuestion)
  .put(extraKeysInReq(pendingQuestionSchema), updatePendingQuestion);

module.exports = router;
