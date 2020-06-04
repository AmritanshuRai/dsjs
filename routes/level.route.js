const express = require('express');
const { addLevel, updateLevel } = require('../controllers/level.controller');
const { Level } = require('../models/Level.model');
// const { Question } = require('../models/Question.model');
const advanceResult = require('../middlewares/advanceResult.middleware');
const {
  protect,
  authorize,
  checkUserOwnership,
} = require('../middlewares/auth.middleware');

const router = express.Router({ mergeParams: true });

router.route('/').post(protect, addLevel);

router.route('/:id').put(protect, checkUserOwnership(Level), updateLevel);

module.exports = router;
