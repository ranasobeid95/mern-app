const express = require('express');

const router = express.Router();

const Post = require('../database/models/Posts');

// Submits a post
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  const post = new Post({
    title,
    description,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.json({ message: error });
  }
});

// Get back all the posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

// Specific post

router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    res.json(post);
  } catch (error) {
    res.json({ message: error });
  }
});

// Delete post

router.delete('/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const removedPost = await Post.remove({ _id: postId });
    res.json(removedPost);
  } catch (error) {
    res.json({ message: error });
  }
});

// Update post

router.patch('/:postId', async (req, res) => {
  const { postId } = req.params;
  const { title } = req.body;
  try {
    const updatedPost = await Post.updateOne(
      { _id: postId },
      { $set: { title } },
    );
    res.json(updatedPost);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
