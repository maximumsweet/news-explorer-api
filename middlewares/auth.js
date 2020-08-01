const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorizedError');
const { UNAUTHORIZED } = require('../configs/errorConstants');

const { jwtDevSecret } = require('../configs/devConfig');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(UNAUTHORIZED);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : jwtDevSecret);
  } catch (err) {
    next(new UnauthorizedError(UNAUTHORIZED));
  }

  req.user = payload;
  return next();
};
