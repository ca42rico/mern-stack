const bcrypt = require("bcrypt");

const User = require("../models/user");

/**
 * Get all users from DB
 * @returns User[]
 */
const getUsers = async () => await User.find().sort("-dateAdded").exec();

/**
 * Get a specific user from DB by username
 * @param username {String}
 * @returns User
 */
const getUser = async (username) => await User.findOne({ username }).exec();

/**
 * Save new user to DB
 * @param username
 * @param password
 * @returns void
 */
const addUser = async (username, password) => {
	const newUser = new User();

	if (await getUser(username)) {
		return { err: "already_present", user: null }; // 409
	}

	newUser.username = username;
	newUser.password = await bcrypt.hash(password, 10);

	return await newUser.save();
};

/**
 * Delete an user by username
 * @param username
 * @returns User
 */
const deleteUser = async (username) => {
	const user = await User.findOne({ username }).exec();

	if (user) return await user.remove();
	return;
};

module.exports = {
	getUsers,
	addUser,
	getUser,
	deleteUser,
};
