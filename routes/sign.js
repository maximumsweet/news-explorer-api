const signRouter = require('express').Router();

const { createUser, login } = require('../controllers/users');
const { createUserCheck, loginCheck } = require('../modules/validation');

signRouter.post('/signup', createUserCheck, createUser);
signRouter.post('/signin', loginCheck, login);

module.exports = signRouter;
