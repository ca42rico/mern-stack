const express = require("express");

const UserController = require("../controllers/user.controller");

const router = express.Router();

router.route("/login").post(UserController.login);

router.route("/logout").post(UserController.logout);

router.route("/signin").post(UserController.signin);

module.exports = router;
