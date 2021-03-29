const express = require("express");
const multer = require("multer");

const config = require("../config");
const PostController = require("../controllers/post.controller");
const ensureAuthentication = require("../middlewares/ensureAuthentication");
const getAuthenticatedUser = require("../middlewares/getAuthenticatedUser");
const uploadImage = require("../middlewares/uploadImage");

const router = express.Router();

router.route("/").get(getAuthenticatedUser, PostController.getPosts);

router.route("/:cuid").get(getAuthenticatedUser, PostController.getPost);

router.route("/").post(
	ensureAuthentication,
	multer({
		dest: "../temp/",
		limits: { fileSize: config.max_upload_bytes_size },
	}).single("image"),
	uploadImage,
	PostController.addPost
);

router.route("/:cuid").delete(ensureAuthentication, PostController.deletePost);

module.exports = router;
