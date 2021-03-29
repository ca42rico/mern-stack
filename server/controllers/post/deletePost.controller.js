const Post = require("../../models/post");

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
module.exports = async (req, res) => {
	const post = await Post.findOne({
		cuid: req.params.cuid,
	}).exec();

	if (post) {
		try {
			if ("" + post.author !== "" + req.user._id) return res.sendStatus(403);
			await post.remove();
			return res.sendStatus(204);
		} catch (err) {
			console.error(err);
			return res.sendStatus(500);
		}
	}
	return res.sendStatus(404);
};
