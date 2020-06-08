const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorizedError');
const { UNAUTHORIZED } = require('../configs/devConfig');

const { SECRET } = require('../configs/devConfig');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(UNAUTHORIZED);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    next(new UnauthorizedError(UNAUTHORIZED));
  }

  req.user = payload;
  return next();
};
