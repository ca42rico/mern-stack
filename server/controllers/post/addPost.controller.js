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
	if (!req.body || !req.body.name || !req.body.title || !req.body.content) {
		return res.sendStatus(400);
	}

	const newPost = new Post({
		image: req.image,
		title: req.body.title,
		name: req.body.name,
		content: req.body.content,
	});

	newPost.title = sanitizeHtml(newPost.title);
	newPost.name = sanitizeHtml(newPost.name);
	newPost.content = sanitizeHtml(newPost.content);
	newPost.author = req.user._id;
	newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
	newPost.cuid = cuid();
	if (req.image) newPost.image = req.image;

	try {
		await newPost.save();
		res
			.status(201)
			.send({ post: { ...newPost._doc, isDelectable: true } });
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};
