const { Question } = require('../models/Question.model');
const { Level } = require('../models/Level.model');

const asyncHandler = require('../middlewares/asyncHandler.middleware');

// @desc      add level for any question
// @route     POST /api/v1/questions/:id/level
// @access    Private

exports.addLevel = asyncHandler(async (req, res, next) => {
  req.body.question = req.params.id;
  req.body.user = req.user.id;

  const question = await Question.findById(req.params.id);

  if (!question) {
    return {
      errorMessage: `Question with id ${req.params.id} not found`,
      errorStatus: 404,
    };
  }

  const level = await Level.create(req.body);

  return {
    success: true,
    data: level,
  };
});

// @desc      Update level for any question
// @route     PUT /api/v1/level/:id
// @access    Private

exports.updateLevel = asyncHandler(async (req, res, next) => {
  // Little trick to trigger 'save' pre hook on update
  const updates = Object.keys(req.body);
  updates.forEach((update) => (res.resource[update] = req.body[update]));
  await res.resource.save();
  return {
    success: true,
    data: res.resource,
  };
});
