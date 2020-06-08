const articlesRouter = require('express').Router();

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { checkArticleId, checkArticle } = require('../modules/validation');

articlesRouter.get('/articles', getArticles);
articlesRouter.post('/articles', checkArticle, createArticle);
articlesRouter.delete('/articles/:articleId', checkArticleId, deleteArticle);

module.exports = articlesRouter;
