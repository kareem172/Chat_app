const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const dotenv = require("dotenv");

//#region importing routes
const homeRoute = require("./routes/pages/homeRoute");
const signupRoute = require("./routes/pages/signupRoute");
const signinRoute = require("./routes/pages/signinRoute");
//#endregion

dotenv.config();
const app = express();
const PORT = 5500;

//#region database connection
mongoose.connect("mongodb://127.0.0.1:27017/ChatApp");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
//#endregion
//#region middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(flash());
//#endregion

//#region page routes
app.use("/", homeRoute);
app.use("/signup", signupRoute);
app.use("/signin", signinRoute);
//#endregion

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
