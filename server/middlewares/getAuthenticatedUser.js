const passport = require("passport");

const getAuthenticatedUser = (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (error, user) => {
		if (user) req.user = user;
		next();
	})(req, res, next);
};

module.exports = getAuthenticatedUser;
