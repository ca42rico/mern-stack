const passport = require("passport");

const ensureAuthentication = (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (error, user) => {
		if (error) return res.sendStatus(500);
		if (!user) return res.sendStatus(401);
		req.user = user;
		next();
	})(req, res, next);
};

module.exports = ensureAuthentication;
