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
		res.status(200).send({
			post: {
				...post._doc,
				isDelectable: req.user ? "" + post.author === "" + req.user._id : false,
			},
		});
	} else {
		res.sendStatus(404);
	}
};
