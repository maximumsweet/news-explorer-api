const usersRouter = require('express').Router();

const { showMyInfo } = require('../controllers/users');
const auth = require('../middlewares/auth');

usersRouter.get('/users/me', auth, showMyInfo);

module.exports = usersRouter;
