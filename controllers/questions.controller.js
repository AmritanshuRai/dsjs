const { Question } = require('../models/Question.model');
const path = require('path');
const { seperator } = require('../utils/chalk.util');
const asyncHandler = require('../middlewares/asyncHandler.middleware');

// @desc      Get all questions
// @route     GET /api/v1/questions
// @access    Public

exports.getQuestions = asyncHandler(async (req, res, next) => {
  return res.advanceResult;
});
