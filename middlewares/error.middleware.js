const { error, seperator, warning } = require('../utils/chalk.util');
const ErrorResponse = require('../utils/errorResponse.utils');

const errorHandler = (err, req, res, next) => {
  error('error.middleware.js : ');
  console.log(err.stack + '\n');

  let errorObj = { ...err };
  errorObj.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource with id ${err.value} not found`;
    errorObj = new ErrorResponse(message, 404);
  }

  //Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate key - ${Object.keys(err.keyValue).join('')}`;
    errorObj = new ErrorResponse(message, 400);
  }

  //Mongoose Validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors);
    errorObj = new ErrorResponse(message, 400);
  }

  if (err.name === 'JsonWebTokenError') {
    const message = 'Not authorized';
    errorObj = new ErrorResponse(message, 401);
  }

  res.status(errorObj.statusCode || 500).json({
    success: false,
    error: errorObj.message + ' 😐' || 'server error',
  });
};

module.exports = errorHandler;
