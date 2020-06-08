const { SERVER_ERROR } = require('../configs/errorConstants');

module.exports.errorMiddleware = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? SERVER_ERROR : message });
};
