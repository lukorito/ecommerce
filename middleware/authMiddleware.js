const jwt = require('jsonwebtoken');
const handler = require('../helpers/handlers');

const passMiddleware = (req, res, next) => next();

const verifyMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const { SECRET_KEY } = process.env;
    try {
      req.user = jwt.verify(token, SECRET_KEY);
      next();
    } catch (error) {
      handler.sendError(res, 'AUT_02', 401, undefined, 'Access Unauthorized');
    }
  } else {
    handler.sendError(res, 'AUT_02', 401, undefined, 'Access Unauthorized');
  }
};
module.exports = {
  passMiddleware,
  verifyMiddleware,
};
