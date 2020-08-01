const articlesRouter = require('express').Router();

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { checkArticleId, checkArticle } = require('../modules/validation');
const auth = require('../middlewares/auth');

articlesRouter.get('/articles', auth, getArticles);
articlesRouter.post('/articles', auth, checkArticle, createArticle);
articlesRouter.delete('/articles/:articleId', auth, checkArticleId, deleteArticle);

module.exports = articlesRouter;
