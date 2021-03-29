const cloudinary = require("cloudinary").v2;
const config = require("../config");

cloudinary.config({
	cloud_name: config.cloudinary.cloud_name,
	api_key: config.cloudinary.api_key,
	api_secret: config.cloudinary.api_secret,
});

exports.upload = (file) => {
	return new Promise((resolve) => {
		cloudinary.uploader.upload(
			file,
			{ width: 450, height: 400, crop: "fill" },
			(error, result) => {
				if (result)
					resolve({
						url: result.url,
						id: result.public_id,
					});
			}
		);
	});
};
