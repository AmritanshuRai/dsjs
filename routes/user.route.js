const express = require('express');
const {
  getUser,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');
const { User } = require('../models/User.model');
const advanceResult = require('../middlewares/advanceResult.middleware');
const { protect, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.route('/').get(advanceResult(User), getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
