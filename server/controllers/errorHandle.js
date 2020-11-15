/* eslint-disable no-unused-vars */
exports.errorHandle = (error) => {
  const errors = {};

  // duplicate email error
  if (error.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }
  // incorrect email
  if (error.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (error.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // validation errors
  if (error.message.includes('validation failed')) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

exports.clientError = (req, res) => {
  res
    .status(404)
    .json({ StatusCode: '404', data: { message: 'page not found 404' } });
};

exports.serverError = (err, req, res, next) => {
  res.status(500).json({
    StatusCode: '500',
    data: { message: 'internal server error 500', err: `${err}` },
  });
};
