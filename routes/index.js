const router = require('express').Router();

const signRouter = require('./sign');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');
const { NOT_FOUND } = require('../configs/errorConstants');

router.use(signRouter);

router.use(auth);
router.use(usersRouter);
router.use(articlesRouter);

router.all((req, res, next) => {
  throw new NotFoundError(NOT_FOUND)
});

module.exports = router;
