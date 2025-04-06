const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ChatApp");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//#region importing routes
const homeRoute = require("./routes/pages/homeRoute");
const signupRoute = require("./routes/pages/signupRoute");
const signinRoute = require("./routes/pages/signinRoute");

const app = express();
const PORT = 5500;

//#region middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//#endregion

//#region page routes
app.use("/", homeRoute);
app.use("/signup", signupRoute);
app.use("/signin", signinRoute);
//#endregion

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
