const { sign } = require('jsonwebtoken');
const User = require('../database/models/User');
const { errorHandle } = require('./errorHandle');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return sign({ id }, process.env.SECRET, { expiresIn: maxAge });
};

exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { _id } = await User.create({ email, password });
    const token = createToken(_id);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ status: 201, data: { userId: _id } });
  } catch (error) {
    const errors = errorHandle(error);
    res.status(400).json(errors);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { _id } = await User.login(email, password);
    const token = createToken(_id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.json({ status: 200, data: { userId: _id } });
  } catch (error) {
    const errors = errorHandle(error);
    res.status(400).json({ errors });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.json({ statusCode: 200, message: 'logout successfully' });
};
