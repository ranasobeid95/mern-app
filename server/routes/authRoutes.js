const { Router } = require('express');

const { signUp, login, logout } = require('../controllers');

const authRouter = Router();

authRouter.post('/signup', signUp);
authRouter.post('/login', login);
authRouter.get('/logout', logout);

module.exports = authRouter;
