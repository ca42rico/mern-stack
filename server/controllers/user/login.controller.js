const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../../services/user.service");
const config = require("../../config");

/**
 * Login
 * @param req
 * @param res
 * @returns res
 */
module.exports = async (req, res) => {
	if (!req.body.user.username || !req.body.user.password) {
		return res.sendStatus(401);
	}

	const username = req.body.user.username.trim();
	const password = req.body.user.password.trim();

	const user = await User.getUser(username);
	if (!user) {
		return res.sendStatus(401);
	}

	const passwordMatching = await bcrypt.compare(password, user.password);

	if (!passwordMatching) return res.sendStatus(401);

	const token = jwt.sign({ ...user }, config.secret, {
		expiresIn: config.tokenExpirationDeadline,
	});

	res.status(200).send({
		token,
		username: user.username,
	});
};
