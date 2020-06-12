const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler.middleware');
const ErrorResponse = require('../utils/errorResponse.utils');
const { User } = require('../models/User.model');
const { seperator } = require('../utils/chalk.util');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization !== undefined &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // send the token from cookies and not headers
  // else if (req.cookies.token){
  //   token = req.cookies.token
  // }

  // Does token exist
  if (!token) {
    return {
      errorMessage: `Not authorized to access this route`,
      errorStatus: 401,
    };
  }

  // Verify token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedToken.id).populate(
    'level',
    'question level'
  );

  next();
});

// Grant access to specific roles
exports.authorize = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return {
        errorMessage: `The role '${req.user.role}' is forbidden`,
        errorStatus: 403,
      };
      // return next(new ErrorResponse(`user role ${res.user.role} is forbidden`,403));
    }

    return next();
  });

// Check existence and ownership of resource
exports.checkUserOwnership = (model) =>
  asyncHandler(async (req, res, next) => {
    let resource = await model.findById(req.params.id);

    // Check that resource exists
    if (!resource) {
      return {
        errorMessage: `Resource not found with id:${req.params.id}`,
        errorStatus: 404,
      };
    }

    // If resource exists, make sure user owns the resource, unless they're admin
    if (req.user.role !== 'admin' && resource.user.toString() !== req.user.id) {
      return {
        errorMessage: `You don't have permission to modify this resource`,
        errorStatus: 401,
      };
    }
    res.resource = resource;
    next();
  });
