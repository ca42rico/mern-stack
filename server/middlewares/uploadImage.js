const cloudinary = require("../utils/cloudinary");

const uploader = async (file) => cloudinary.upload(file);

module.exports = async (req, res, next) => {
	if (req.file && req.file.path) {
		const image = await uploader(req.file.path);
		if (image) req.image = image.url;
	}
	next();
};
