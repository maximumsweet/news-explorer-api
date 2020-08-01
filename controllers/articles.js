const articleModel = require('../models/article');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const { DELETE_ERROR, ARTICLE_NOT_FOUND } = require('../configs/errorConstants');

module.exports.getArticles = (req, res, next) => {
  articleModel.find({ owner: req.user._id })
    .then((articles) => res.status(200).send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  articleModel.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  const { _id } = req.user;
  const { articleId } = req.params;

  articleModel.findById(articleId).select('+owner')
    .orFail(() => {
      throw new NotFoundError(ARTICLE_NOT_FOUND);
    })
    .then((article) => {
      if (_id === String(article.owner)) {
        articleModel.findByIdAndRemove(articleId)
          .then(() => res.status(200).send({ data: article }))
          .catch(next);
      } else {
        throw new ForbiddenError(DELETE_ERROR);
      }
    })
    .catch(next);
};
