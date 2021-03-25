const Post = require('../models/post');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');

/**
 * Get all posts from DB
 * @param req
 * @param res
 * @returns void
 */
getPosts = async () => {
  Post
  .find()
  .sort('-dateAdded')
  .exec((err, posts) => {
    return { err, posts };
  });
};

/**
 * Save a post to DB
 * @param req
 * @param res
 * @returns void
 */
addPost = async post => {
  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  await newPost.save((err, saved) => ({ err, post: saved }));
};

/**
 * Get a single post from DB
 * @param req
 * @param res
 * @returns void
 */
getPost = async cuid => {
  await Post
  .findOne({ cuid })
  .exec((err, post) => {
    return {err, post}
  });
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
deletePost = async (req, res) => {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
};

module.exports = {
  getPosts,
  addPost,
  getPost,
  deletePost
};
