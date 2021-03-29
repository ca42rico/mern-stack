const express = require("express");
const cors = require("cors");
const passport = require("passport");

const db = require("./db");
const postsRoutes = require("./routes/post.routes");
const usersRoutes = require("./routes/user.routes");
require("./config");

const app = express();
const apiPort = 3000;

app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api", postsRoutes);
app.use("/api", usersRoutes);

app.use(passport.initialize());
app.use(passport.session());
require("./utils/passport")(passport);

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
