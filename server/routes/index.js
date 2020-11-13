const router = require('express').Router();
const posts = require('./posts');
const authRouter = require('./authRoutes');

router.use(authRouter);
router.use('/posts', posts);

module.exports = router;
