const ErrorResponse = require('./errorResponse.utils');

const extraKeysInReq = (reqBody, { obj }) => {
  // contains every object name with 'required' key
  const withRequiredKey = Object.keys(obj).map((key) => {
    if (obj[key].hasOwnProperty('required')) {
      return key;
    }
  });

  // extra keys found in request body
  const extraKeys = Object.keys(reqBody).filter(
    (reqBodyKey) => !withRequiredKey.includes(reqBodyKey),
  );

  //throws error if extra keys found in request body
  if (extraKeys.length) {
    const message = `Extra key(s) found - ${extraKeys.join(', ')}`;
    throw new ErrorResponse(message, 400);
  }
};

module.exports = extraKeysInReq;
