const { PendingQuestion } = require('../models/PendingQuestion.model');
const path = require('path');
const { seperator } = require('../utils/chalk.util');
const asyncHandler = require('../middlewares/asyncHandler.middleware');
const { Level } = require('../models/Level.model');

// @desc      Get all pending questions
// @route     GET /api/v1/pendingQuestions
// @access    Public

exports.getPendingQuestions = asyncHandler(async (req, res, next) => {
  return res.advanceResult;
});

// @desc      Get single pending question
// @route     GET /api/v1/pendingQuestions/:id
// @access    Public

exports.getPendingQuestion = asyncHandler(async (req, res, next) => {
  const pendingQuestion = await PendingQuestion.findById(req.params.id);
  if (!pendingQuestion) {
    return {
      errorMessage: 'No pending question found',
      errorStatus: 404,
    };
  }
  return {
    success: true,
    data: pendingQuestion,
  };
});

// @desc      Create new pending question
// @route     POST /api/v1/pendingQuestions
// @access    private

exports.createPendingQuestion = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const pendingQuestion = await PendingQuestion.create(req.body);
  // levelObj = {
  //   pendingQuestion: pendingQuestion._id,
  //   user: req.user.id,
  //   level: req.body.level,
  // };
  // await Level.create(levelObj);
  return {
    success: true,
    data: pendingQuestion,
  };
});

// @desc      update a pending question
// @route     PUT /api/v1/pendingQuestions/:id
// @access    private

exports.updatePendingQuestion = asyncHandler(async (req, res, next) => {
  const pendingQuestion = await PendingQuestion.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  return {
    success: true,
    data: pendingQuestion,
  };
});

// @desc      delete one or many pending question(s)
// @route     DELETE /api/v1/pendingQuestions/
// @access    private
exports.deletePendingQuestions = asyncHandler(async (req, res, next) => {
  if (req.body.id.length) {
    await PendingQuestion.deleteMany({ _id: { $in: req.body.id } });
  } else {
    await PendingQuestion.deleteMany();
  }
  return {
    success: true,
  };
});
