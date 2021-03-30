const Post = require("../../services/post.service");

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
module.exports = async (req, res) => {
	try {
		if (!req.params.cuid) return res.sendStatus(400);

		const post = await Post.getPost(req.params.cuid);

		if (post) {
			res.status(200).send({
				post: {
					...post._doc,
					isDelectable: req.user
						? "" + post.author === "" + req.user._id
						: false,
				},
			});
		} else {
			res.sendStatus(404);
		}
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
};
