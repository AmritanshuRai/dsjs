const asyncHandler = require('./asyncHandler.middleware');
exports.extraKeysInReq = ({ obj }) =>
  asyncHandler(async (req, res, next) => {
    // contains every object name with 'required' key
    const withRequiredKey = Object.keys(obj).map((key) => {
      if (obj[key].hasOwnProperty('required')) {
        return key;
      }
    });

    // extra keys found in request body
    const extraKeys = Object.keys(req.body).filter(
      (reqBodyKey) => !withRequiredKey.includes(reqBodyKey)
    );

    //throws error if extra keys found in request body
    if (extraKeys.length) {
      return {
        errorMessage: `Extra key(s) found - ${extraKeys.join(', ')}`,
        errorStatus: 400,
      };
    }
    next();
  });
