const express = require("express");
const multer = require("multer");
const config = require("../config");

const PostController = require("../controllers/post.controller");
const ensureAuthentication = require("../middlewares/ensureAuthentication");
const getAuthenticatedUser = require("../middlewares/getAuthenticatedUser");
const uploadImage = require("../middlewares/uploadImage");

const storage = multer.memoryStorage();
const upload = multer({storage});

const router = express.Router();

router.route("/posts").get(getAuthenticatedUser, PostController.getPosts);

router.route("/posts/:cuid").get(getAuthenticatedUser, PostController.getPost);

router
	.route("/posts-old")
	.post(
		ensureAuthentication,
		multer({
			dest: "../uploads/",
			limits: { fileSize: config.max_upload_bytes_size },
		}).single("image"),
		uploadImage,
		PostController.addPost
	);

router
	.route("/posts")
	.post(
		ensureAuthentication,
		multer({
			dest: "../temp/",
			inMemory: true,
			limits: { fileSize: config.max_upload_bytes_size },
		}).single("image"),
		uploadImage,
		PostController.addPost
	);

router
	.route("/posts/:cuid")
	.delete(ensureAuthentication, PostController.deletePost);

module.exports = router;
