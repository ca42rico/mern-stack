require("dotenv").config();

module.exports = {
	secret: "abcdefg",
	tokenExpirationDeadline: "24h",
	database: {
		url: "127.0.0.1:27017",
		name: "mern-stack",
	},
	max_upload_bytes_size: 2000000,
	cloudinary: {
		cloud_name: process.env.CLOUD_NAME,
		api_key: process.env.API_KEY,
		api_secret: process.env.API_SECRET,
		image_width: 450,
		image_height: 400,
	},
	port: 3000,
};
