// const mongoose = require('mongoose');
const { seperator } = require('../utils/chalk.util');
const { User, UserSchema } = require('../models/User.model');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');
const asyncHandler = require('../middlewares/asyncHandler.middleware');
const mail = require('../utils/mail.util');
const crypto = require('crypto');
const shortid = require('shortid').generate;

// @desc      Github sign in
// @route     POST /api/v1/auth/githubauth
// @access    Private

exports.githubController = asyncHandler(async (req, res, next) => {
  // const {
  //   query: { code },
  // } = req;
  const { code } = req.body;

  if (!code) {
    return {
      errorMessage: `Github login failed: No code present`,
      errorStatus: 400,
    };
  }
  console.log('process.env', process.env);
  const url = `https://github.com/login/oauth/access_token`;
  let accessTokenRes = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET_KEY,
      code,
    }),
  });

  const accessToken = await accessTokenRes.json();
  console.log('accessToken: ', accessToken);

  let userDetailsRes = await fetch(`https://api.github.com/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `token ${accessToken.access_token}`,
    },
  });
  const userDetails = await userDetailsRes.json();

  const userEmailRes = await fetch(`https://api.github.com/user/emails`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `token ${accessToken.access_token}`,
    },
  });
  const userEmail = await userEmailRes.json();
  console.log('userEmail: ', userEmail);
  if (!userEmail[0].email || !userEmail[0].verified) {
    return {
      errorMessage: `Cannot verify your email address.`,
      errorStatus: 401,
    };
  }
  const email = userEmail[0].email;
  const name = userDetails.login;

  const user = await User.findOne({ email });
  if (!user) {
    const userInstance = new User({
      name,
      email,
      role: 'user',
      verified: true,
      password: shortid(),
    });
    await userInstance.save();
    return sendTokenResponse(userInstance);
  }
  return sendTokenResponse(user);
});

// @desc      Google sign in
// @route     POST /api/v1/auth/googlelogin
// @access    Private

exports.facebookController = asyncHandler(async (req, res, next) => {
  const { userID, accessToken } = req.body;
  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
  let response = await fetch(url, {
    method: 'GET',
  });
  response = await response.json();
  const { email, name } = response;
  const user = await User.findOne({ email });
  if (!user) {
    const userInstance = new User({
      name,
      email,
      role: 'user',
      verified: true,
      password: shortid(),
    });
    await userInstance.save();
    return sendTokenResponse(userInstance);
  }
  return sendTokenResponse(user);
});

// @desc      Google sign in
// @route     POST /api/v1/auth/googlelogin
// @access    Private
exports.googleController = asyncHandler(async (req, res, next) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

  const { idToken } = req.body;

  const response = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT,
  });
  const { email_verified, name, email } = response.payload;
  if (!name || !email) {
    return {
      errorMessage: `It's raining men, hallelujah`,
      errorStatus: 400,
    };
  }
  if (email_verified) {
    const user = await User.findOne({ email });
    if (!user) {
      const userInstance = new User({
        name,
        email,
        role: 'user',
        verified: true,
        password: shortid(),
      });
      await userInstance.save();
      return sendTokenResponse(userInstance);
    }
    return sendTokenResponse(user);
  }
  return {
    errorMessage: 'Google login failed. Try again.',
    errorStatus: 401,
  };
});

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const doesUserExist = await User.findOne({ email: req.body.email });

  if (doesUserExist && doesUserExist.verified) {
    return {
      errorMessage: `${req.body.email} is already registered`,
      errorStatus: 404,
    };
  }
  const {
    resetToken,
    self: { resetPasswordExpire, resetPasswordToken },
  } = UserSchema.methods.getResetPasswordToken();
  const { name, email, password } = req.body;

  //Create user
  const user = await User.create({
    name,
    email,
    password,
    resetPasswordToken,
    resetPasswordExpire,
  });
  let forwardto;
  if (req.get('host').split(':')[0] === 'localhost') {
    forwardto = 'localhost:3000';
  } else {
    forwardto = req.get('host');
  }
  const verificationUrl = `${req.protocol}://${forwardto}/verifyemail/${resetToken}`;
  const message = `Please Click ${verificationUrl}`;
  try {
    await mail({
      email: user.email,
      message,
      subject: 'Verify Email',
    });
    return {
      success: true,
      message: 'Please verify your email',
    };
  } catch (error) {
    console.log('error: ', error);
    await User.findByIdAndDelete(user.id);
    return {
      errorMessage: 'Signup could not be completed',
      errorStatus: 500,
    };
  }
});

// @desc      Verify Email is valid
// @route     GET /api/v1/auth/verifyemail/:id
// @access    Public

exports.verifyEmail = asyncHandler(async (req, res, next) => {
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
      errorMessage: `Link expired or token doesn't exist`,
      errorStatus: 400,
    };
  }
  // verified
  user.verified = true;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
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
  return sendTokenResponse(req.user);
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
  let forwardto;
  if (req.get('host').split(':')[0] === 'localhost') {
    forwardto = 'localhost:3000';
  } else {
    forwardto = req.get('host');
  }
  const resetUrl = `${req.protocol}://${forwardto}/resetpassword/${resetToken}`;
  const message = `Please click ${resetUrl}`;

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
      errorMessage: `Link expired or token doesn't exist`,
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

  // const options = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  // };
  // if (!token) {
  //   options.expires = new Date(Date.now() + 10 * 1000);
  // }
  // if (process.env.NODE_ENV === 'production') {
  //   options.secure = true;
  // }
  return {
    success: true,
    data: {
      token,
      displayName: user.name,
      email: user.email,
      id: user._id.toString(),
    },
  };
  // return {
  //   success: true,
  //   cookie: ['token', token, options],
  //   token,
  // };
};
