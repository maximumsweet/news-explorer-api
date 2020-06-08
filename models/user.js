const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { INVALID_EMAIL, WRONG_AUTH } = require('../configs/errorConstants');
const UnauthorizedError = require('../errors/unauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.path('email').validate(validator.isEmail, INVALID_EMAIL);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(WRONG_AUTH));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(WRONG_AUTH));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
