const express = require("express");
const cors = require("cors");
const passport = require("passport");

require("./db");
const config = require("./config");
const buildRoutes = require("./routes/");
const configPassport = require("./utils/passport")

const app = express();
const apiPort = config.port || 3000;

app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use(passport.initialize());
app.use(passport.session());
configPassport(passport);

app.use("/api", buildRoutes);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
