const express = require('express');
const {
  register,
  login,
  getMe,
  forgotpassword,
  resetPassword,
  updateDetails,
  updatePassword,
  verifyEmail,
  logout,
} = require('../controllers/auth.controller');
const { User, UserSchema } = require('../models/User.model');
const { protect } = require('../middlewares/auth.middleware');
const { extraKeysInReq } = require('../middlewares/extraKeysInReq.middleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', extraKeysInReq(UserSchema), login);
router.get('/me', protect, getMe);
router.put(
  '/updatedetails',
  protect,
  extraKeysInReq(UserSchema),
  updateDetails
);
router.put('/updatepassword', protect, updatePassword);

router.post('/forgotpassword', forgotpassword);
router.get('/resetpassword/:id', resetPassword);
router.get('/verifyemail/:id', verifyEmail);

router.get('/logout', logout);

module.exports = router;
