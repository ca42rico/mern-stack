const Post = require("../models/post");

/**
 * Get all posts from DB
 * @param req
 * @param res
 * @returns Post[]
 */
const getPosts = async () => await Post.find().sort("-dateAdded").exec();

/**
 * Get a single post from DB
 * @param req
 * @param res
 * @returns Post
 */
const getPost = async (cuid) => await Post.findOne({ cuid }).exec();

module.exports = {
	getPosts,
	getPost,
};
