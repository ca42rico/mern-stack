const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const db = require("./db");
const postsRoutes = require("./routes/post.routes");
const usersRoutes = require("./routes/user.routes");

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use("/api", postsRoutes);
app.use("/api", usersRoutes);

app.use(passport.initialize());
app.use(passport.session());
require("./utils/passport")(passport);

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
