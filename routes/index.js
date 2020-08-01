const router = require('express').Router();

const signRouter = require('./sign');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const NotFoundError = require('../errors/notFoundError');
const { NOT_FOUND } = require('../configs/errorConstants');

router.use(signRouter);
router.use(usersRouter);
router.use(articlesRouter);

router.use((req, res, next) => next(new NotFoundError(NOT_FOUND)));

module.exports = router;
