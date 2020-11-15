const { verify } = require('jsonwebtoken');

const protectedRoute = async (req, res, next) => {
  if (req.cookies) {
    try {
      const { jwt } = req.cookies;

      const payload = await verify(jwt, process.env.SECRET);
      req.user = payload;
      next();
    } catch (error) {
      res.status(401).json({ status: 401, message: 'unauthorized' });
    }
  } else {
    res.status(401).json({ statusCode: 401, message: 'Sign-in first' });
  }
};

module.exports = { protectedRoute };
