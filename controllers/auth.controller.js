const mongoose = require('mongoose');
const { seperator } = require('../utils/chalk.util');
const { User } = require('../models/User.model');
const asyncHandler = require('../middlewares/asyncHandler.middleware');
const mail = require('../utils/mail.util');
const crypto = require('crypto');

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // Create token
  return sendTokenResponse(user);
});

// @desc      Login user
// @route     POST /api/v1/auth/register
// @access     Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return {
      errorMessage: 'email or password is empty',
      errorStatus: 400,
    };
  }

  // Check for user existence
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return {
      errorMessage: 'Invalid credentials',
      errorStatus: 401,
    };
  }

  // check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return {
      errorMessage: 'Invalid credentials',
      errorStatus: 401,
    };
  }
  return sendTokenResponse(user);
});

// @desc      Logout / clear cookies
// @route     GET /api/v1/auth/logout
// @access    Private

exports.logout = asyncHandler(async (req, res, next) => {
  // res.clearCookie('token');

  res.clearCookie('token');
  return {
    success: true,
    data: {},
  };
});

// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private

exports.getMe = asyncHandler(async (req, res, next) => {
  return {
    success: true,
    data: req.user,
  };
});

// @desc      Forgot password
// @route     GET /api/v1/auth/forgotpassword
// @access    Public

exports.forgotpassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return {
      errorMessage: `No user found with email ${req.body.email}`,
      errorStatus: 404,
    };
  }
  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;
  const message = `Make a PUT request to ${resetUrl}`;

  try {
    await mail({
      email: user.email,
      message,
      subject: 'Reset Password',
    });
    return {
      success: true,
      message: 'email sent',
      data: user,
    };
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return {
      errorMessage: 'Email could not be sent',
      errorStatus: 500,
    };
  }
});

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:id
// @access    Public

exports.resetPassword = asyncHandler(async (req, res, next) => {
  //Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.id)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return {
      errorMessage: `Invalid token`,
      errorStatus: 400,
    };
  }
  // set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  return sendTokenResponse(user);
});

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private

exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });
  return {
    success: true,
    data: user,
  };
});

// @desc      Update user password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  // verify current password with the password in DB
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return {
      errorMessage: 'password is incorrect',
      errorStatus: 401,
    };
  }
  user.password = req.body.newPassword;
  await user.save();
  return sendTokenResponse(user);
});

// Get token form model, Create cookie and send response
const sendTokenResponse = (user) => {
  // Create Token

  const token = user.getSignedJWTToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // if (!token) {
  //   options.expires = new Date(Date.now() + 10 * 1000);
  // }
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  return {
    success: true,
    cookie: ['token', token, options],
    token,
  };
};
