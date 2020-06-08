const usersRouter = require('express').Router();

const { showMyInfo } = require('../controllers/users');

usersRouter.get('/users/me', showMyInfo);

module.exports = usersRouter;
