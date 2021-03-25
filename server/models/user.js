const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: { type: "String", unique: true },
	password: { type: "String", required: true },
	dateAdded: { type: "Date", default: Date.now, required: true },
});

module.exports = mongoose.model("User", userSchema);
