const express = require("express");

const PostController = require("../controllers/post.controller");
const ensureAuthentication = require("../middlewares/ensureAuthentication");
const getAuthenticatedUser = require("../middlewares/getAuthenticatedUser");

const router = express.Router();

router.route("/posts").get(getAuthenticatedUser, PostController.getPosts);

router.route("/posts/:cuid").get(getAuthenticatedUser, PostController.getPost);

router.route("/posts").post(ensureAuthentication, PostController.addPost);

router
	.route("/posts/:cuid")
	.delete(ensureAuthentication, PostController.deletePost);

module.exports = router;
