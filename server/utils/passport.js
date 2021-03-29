const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user");
const config = require("../config");

module.exports = (passport) => {
	const opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: config.secret,
	};
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			User.findOne({ username: jwt_payload._doc.username }, (err, user) => {
				if (err) return done(err, false);
				if (user) return done(null, user);
				return done(null, false);
			});
		})
	);
};
