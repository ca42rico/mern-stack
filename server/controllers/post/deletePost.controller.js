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
		author: req.user._id,
	}).exec();
	if (post) {
		await post.remove();
		return res.sendStatus(204);
	}
	return res.sendStatus(404);
};
