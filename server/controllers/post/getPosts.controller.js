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
			const posts_ = posts.map((post) => ({
				...post._doc,
				isDelectable: "" + post.author === "" + req.user._id,
			}));
			return res.json({ posts: posts_ });
		}
		return res.json({ posts });
	} catch (err) {
		return res.status(500).send(err);
	}
};

