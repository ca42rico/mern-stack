const Post = require("../../models/post");

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
module.exports = async (req, res) => {
	const post = await Post.findOne({ cuid: req.params.cuid }).exec();

	if (post) {
		if (req.user) {
			const post_ = {
				...post,
				isDelectable: "" + post.author === "" + req.user._id,
			};
			return res.status(200).send({ post: post_ });
		}
		return res.status(200).send({ post });
	}

	return res.sendStatus(404);
};
