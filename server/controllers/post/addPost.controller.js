const cuid = require("cuid");
const slug = require("limax");
const sanitizeHtml = require("sanitize-html");

const Post = require("../../models/post");

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
module.exports = async (req, res) => {
	if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
		return res.sendStatus(400);
	}

	const newPost = new Post(req.body.post);

	newPost.title = sanitizeHtml(newPost.title);
	newPost.name = sanitizeHtml(newPost.name);
	newPost.content = sanitizeHtml(newPost.content);
	newPost.author = req.user._id;
	newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
	newPost.cuid = cuid();

	try {
		await newPost.save();
		return res
			.status(201)
			.send({ post: { ...newPost._doc, isDelectable: true } });
	} catch (err) {
		console.error(err);
		return res.status(500).send(err);
	}
};
