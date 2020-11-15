const { clientError, serverError } = require('./errorHandle');
const { signUp, login, logout } = require('./authController');

module.exports = {
  signUp,
  login,
  logout,
  clientError,
  serverError,
};
