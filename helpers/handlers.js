/**
 *
 * @param res {Response}
 * @param statusCode {Number}
 * @param results {Object}
 */
function sendResponse(res, statusCode, results) {
  res.status(statusCode).json(results);
}

/**
 * @description sends error messages
 * @param res {Response}
 * @param errorCode {Number}
 * @param statusCode {Number}
 * @param field {String}
 * @param message {String}
 */
function sendError(res, errorCode = undefined, statusCode, field = undefined, message) {
  const dataError = {
    error: {
      code: errorCode,
      message,
      field,
      status: statusCode,
    },
  };
  res.status(statusCode).json(dataError);
}

/**
 *
 * @param res {Response}
 * @param statusCode {Number}
 * @param errors {Array}
 */
function sendErrors(res, statusCode, errors) {
  const dataErrors = {
    errors,
  };
  res.status(statusCode).json(dataErrors);
}

module.exports = {
  sendError,
  sendResponse,
  sendErrors,
};
