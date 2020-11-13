const { clientError, serverError } = require('./errorHandle');
const { signUp, login } = require('./authController');

module.exports = {
  signUp,
  login,
  clientError,
  serverError,
};
