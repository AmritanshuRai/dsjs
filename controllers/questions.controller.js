const { Question } = require('../models/Question.model');
const { PendingQuestion } = require('../models/PendingQuestion.model');

const path = require('path');
const { seperator } = require('../utils/chalk.util');
const asyncHandler = require('../middlewares/asyncHandler.middleware');
const { Level } = require('../models/Level.model');
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
  // Add user to req.body
  req.body.user = req.user.id;

  const question = await Question.create(req.body);

  //delete pendingQuestion
  if (req.body.id.length) {
    await PendingQuestion.deleteMany({ _id: { $in: req.body.id } });
  } else {
    return {
      errorMessage: `delete id not found`,
      errorStatus: 404,
    };
  }

  // levelObj = {
  //   question: question._id,
  //   user: req.user.id,
  //   level: req.body.level,
  // };
  // await Level.create(levelObj);

  return {
    success: true,
    data: question,
  };
});

// @desc      update question
// @route     PUT /api/v1/questions/:id
// @access    private

exports.updateQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  return {
    success: true,
    data: question,
  };
});

// @desc      delete all questions
// @route     DELETE /api/v1/questions/
// @access    private
exports.deleteQuestions = asyncHandler(async (req, res, next) => {
  if (req.body.id.length) {
    await Question.deleteMany({ _id: { $in: req.body.id } });
  } else {
    await Question.deleteMany();
  }
  return {
    success: true,
  };
});
