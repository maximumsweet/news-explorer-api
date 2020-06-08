const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user.js');
const ConflictError = require('../errors/conflictError');
const { EMAIL_ALREADY_EXISTS } = require('../configs/errorConstants');

const { SECRET } = require('../configs/devConfig');

module.exports.showMyInfo = (req, res, next) => {
  userModel.findById({ _id: req.user._id })
    .then((user) => res.status(200).send({ email: user.email, name: user.name }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  userModel.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        throw new ConflictError(EMAIL_ALREADY_EXISTS);
      }
      bcrypt
        .hash(password, 10)
        .then((hash) => userModel.create({
          email,
          password: hash,
          name,
        }))
        .then((user) => res.status(201).send({
          _id: user._id,
          email: user.email,
          name: user.name,
        }));
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 604800,
        httpOnly: true,
        sameSite: true,
        secure: true,
      });
      res.send({ token });
    })
    .catch(next);
};
