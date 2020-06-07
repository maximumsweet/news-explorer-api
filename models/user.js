const mongoose = require('mongoose');
const validator = require('validator');

const { INVALID_EMAIL } = require('../configs/errorConstants');

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

module.exports = mongoose.model('user', userSchema);
