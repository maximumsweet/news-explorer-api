const jwt = require('jsonwebtoken');

const { SECRET } = require('../configs/devConfig');

const UnauthorizedError = require('../errors/unauthorizedError');
const { UNAUTHORIZED } = require('../configs/devConfig');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(UNAUTHORIZED);
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, SECRET);
    } catch (err) {
      throw new UnauthorizedError(UNAUTHORIZED);
    }

    req.user = payload;
    next();
  }
};
