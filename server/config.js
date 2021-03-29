require("dotenv").config();

module.exports = {
	secret: "abcdefg",
	tokenExpirationDeadline: "24h",
	database: {
		host: "mongodb://127.0.0.1",
		port: "27017",
		name: "mern-stack",
	},
	max_upload_bytes_size: 2000000, // 2MB
	cloudinary: {
		cloud_name: process.env.CLOUD_NAME,
		api_key: process.env.API_KEY,
		api_secret: process.env.API_SECRET,
	},
};
