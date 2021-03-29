const Post = require("../../models/post");

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
module.exports = async (req, res) => {
	try {
		const posts = await Post.find().sort("-dateAdded").exec();

		if (req.user) {
			const posts_with_isDelectable = posts.map((post) => ({
				...post._doc,
				isDelectable: "" + post.author === "" + req.user._id,
			}));
			return res.json({ posts: posts_with_isDelectable });
		}
		res.json({ posts });
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};
