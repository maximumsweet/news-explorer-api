const mongoose = require('mongoose');
const validator = require('validator');
const { INVALID_LINK } = require('../configs/errorConstants');

const articleSchema = new mongoose.Schema({
  keyword: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  text: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
  source: {
    required: true,
    type: String,
  },
  link: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    select: false,
  },
});

articleSchema.path('link').validate(validator.isURL, INVALID_LINK);
articleSchema.path('image').validate(validator.isURL, INVALID_LINK);

module.exports = mongoose.model('article', articleSchema);
