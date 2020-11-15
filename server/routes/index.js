const router = require('express').Router();
const posts = require('./posts');
const authRouter = require('./authRoutes');
const { protectedRoute } = require('../controllers/middleware/isAuth');

router.use(authRouter);
router.use('/posts', protectedRoute, posts);

module.exports = router;
