const ErrorResponse = require('../utils/errorResponse.utils');
const { clearHash } = require('../utils/cache.util');

// const statusCode = {
//   GET: 200,
//   DELETE: 204,
//   PUT: 201,
//   POST: 200,
// };
const asyncHandler = (fn) => (req, res, next) => {
  const sendToClient = (response) => {
    if (!response) {
      return;
    }

    // If error is present
    if (response.errorMessage !== undefined) {
      return next(
        new ErrorResponse(response.errorMessage, response.errorStatus)
      ); // else if cookie is present
    } else if (response.cookie !== undefined) {
      const { cookie, ...remainingResponse } = response;
      return res
        .status(200)
        .cookie(...cookie)
        .json({
          ...remainingResponse,
        });
    } else {
      return res.status(200).json({
        ...response,
      });
    }
  };
  return Promise.resolve(fn(req, res, next))

    .then((response) => {
      //send response to client
      sendToClient(response);
      // clear redis cache if database is modified
      if (response && response.success && req.method !== 'GET') {
        const reqUrl = req.originalUrl.toLowerCase();
        if (reqUrl === `/api/v1/pendingquestions`) {
          clearHash('pendingquestions');
          clearHash('pendingquestionsCount');
        } else if (reqUrl === `/api/v1/questions`) {
          clearHash('questions');
          clearHash('questionsCount');
        }
      }
    })
    .catch(next);
};

module.exports = asyncHandler;
