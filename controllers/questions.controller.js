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

// @desc      Get single question
// @route     GET /api/v1/questions/:id
// @access    Public

exports.getQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.findById(req.params.id);
  if (!question) {
    return {
      errorMessage: 'No question found',
      errorStatus: 404,
    };
  }
  return {
    success: true,
    data: question,
  };
});

// @desc      Create new question
// @route     POST /api/v1/questions
// @access    private

exports.createQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.create(req.body);

  return {
    success: true,
    data: question,
  };
});
