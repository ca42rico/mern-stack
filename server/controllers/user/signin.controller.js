const jwt = require("jsonwebtoken");

const User = require("../../services/user.service");
const config = require("../../config");

const MIN_PASSWORD_LENGTH = 6;

/**
 * SignIn
 * @param req
 * @param res
 * @returns res
 */
module.exports = async (req, res) => {
	if (
		!req.body.user.username ||
		!req.body.user.password ||
		req.body.user.password.length < MIN_PASSWORD_LENGTH
	) {
		return res.sendStatus(400);
	}

	const username = req.body.user.username.trim();
	const password = req.body.user.password.trim();

	const userResult = await User.addUser(username, password);
	if (userResult.err) {
		return res.status(409).send({ status: "Username already used" });
	}

	const token = jwt.sign({ ...userResult }, config.secret, {
		expiresIn: config.tokenExpirationDeadline,
	});

	return res.status(201).send({
		token,
		username: userResult.username,
	});
};
